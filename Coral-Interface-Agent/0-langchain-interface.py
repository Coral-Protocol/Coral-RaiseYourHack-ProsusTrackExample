import asyncio
import os
import json
import logging
import urllib.parse
from dotenv import load_dotenv
from anyio import ClosedResourceError
from langchain_mcp_adapters.client import MultiServerMCPClient
from langchain.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_groq import ChatGroq
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain.tools import Tool
from langchain_community.callbacks import get_openai_callback

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

load_dotenv()

base_url = "http://localhost:5555/devmode/exampleApplication/privkey/session1/sse"
params = {
    "waitForAgents": 1,
    "agentId": "user_interaction_agent",
    "agentDescription": "You are user_interaction_agent, handling user instructions and coordinating testing tasks across agents"
}
query_string = urllib.parse.urlencode(params)
MCP_SERVER_URL = f"{base_url}?{query_string}"
AGENT_NAME = "user_interaction_agent"

def get_tools_description(tools):
    return "\n".join(
        f"Tool: {tool.name}, Schema: {json.dumps(tool.args).replace('{', '{{').replace('}', '}}')}"
        for tool in tools
    )

async def ask_human_tool(question: str) -> str:
    print(f"Agent asks: {question}")
    return input("Your response: ")

async def create_interface_agent(client, tools):
    tools_description = get_tools_description(tools)
    
    prompt = ChatPromptTemplate.from_messages([
        (
            "system",
            f"""You are an agent interacting with the tools from Coral Server and using your own `ask_human` tool to communicate with the user.

            Follow these steps in order:

            1. Use `list_agents` to list all connected agents and get their descriptions.
            2. Use `ask_human` to ask: "How can I assist you today?" and wait for the response.
            3. Take 2 seconds to understand the user's intent and decide which agent(s) are needed based on their descriptions.
            4. If the user requests Coral Server information (e.g., agent status, connection info), use your tools to retrieve and return the information directly to the user, then go back to Step 1.
            5. If fulfilling the request requires multiple agents, determine the sequence and logic for calling them.
            6. For each selected agent:
            * **If a conversation thread with the agent does not exist, use `create_thread` to create one.**
            * Construct a clear instruction message for the agent.
            * Use **`send_message(senderId=..., mentions=[Receive Agent Id], threadId=..., content="instruction")`.**
            * Use `wait_for_mentions(timeoutMs=60000)` to receive the agent's response, 
              if there is no meesage receive during the first time, check if you mention the receiver ID when you use `send_message(senderId=..., mentions=[Receive Agent Id], threadId=..., content="instruction")`,
              otherwise, recall `wait_for_mentions(timeoutMs=60000)` up to 5 times if no message received.
            * Record and store the response for final presentation.
            7. After all required agents have responded, show the complete conversation (all thread messages) to the user.
            8. Wait for 3 seconds, then use `ask_human` to ask: "Is there anything else I can help you with?"
            9. If the user replies with a new request, repeat the process from Step 1.
            - Use only tools: {tools_description}"""),
        ("placeholder", "{agent_scratchpad}")
    ])

    # model = ChatOpenAI(
    #     model="gpt-4.1-mini-2025-04-14",
    #     api_key=os.getenv("OPENAI_API_KEY"),
    #     temperature=0.3,
    #     max_tokens=32768
    # )

    model = ChatGroq(
        model="llama3-70b-8192",
        temperature=0.3
    )

    agent = create_tool_calling_agent(model, tools, prompt)
    return AgentExecutor(agent=agent, tools=tools, max_iterations=100, verbose=True, stream_runnable=False)

async def stream_agent_response(agent_executor):
    """Handle streaming response from the agent executor"""
    full_response = ""
    
    async for chunk in agent_executor.astream({}):
        # Handle different types of chunks
        if isinstance(chunk, dict):
            for key, value in chunk.items():
                # Handle agent actions
                if key == "actions" and value:
                    for action in value:
                        if action.tool == "ask_human":
                            # Handle both dict and string tool_input
                            if isinstance(action.tool_input, dict):
                                question = action.tool_input.get('question', action.tool_input)
                            else:
                                question = action.tool_input
                            print(f"\n🤖💬 AGENT : {question}")
                            print(f"=" * 50)
                
                # Handle final output
                elif key == "output":
                    full_response += str(value)
        
        else:
            # Handle non-dict chunks silently
            full_response += str(chunk)
    return full_response


async def main():
    max_retries = 5
    retry_delay = 5  # seconds
    client = None
    
    for attempt in range(max_retries):
        try:
            # Create client without context manager (new approach for v0.1.0+)
            client = MultiServerMCPClient(
                connections={
                    "coral": {
                        "transport": "sse",
                        "url": MCP_SERVER_URL,
                        "timeout": 600,
                        "sse_read_timeout": 600,
                    }
                }
            )
            
            logger.info(f"Connected to MCP server at {MCP_SERVER_URL}")
            
            # Get tools using the new approach
            mcp_tools = await client.get_tools()
            tools = mcp_tools + [Tool(
                name="ask_human",
                func=None,
                coroutine=ask_human_tool,
                description="Ask the user a question and wait for a response."
            )]
            
            tools_description = get_tools_description(tools)
            print(tools)
            logger.info(f"Tools Description:\n{get_tools_description(tools)}")

            agent_executor = await create_interface_agent(client, tools)
            #await agent_executor.ainvoke({})
                # Choose streaming method              
            print("Streaming agent response...")
            await stream_agent_response(agent_executor)
                
                # logger.info(f"Token usage for this run:")
                # logger.info(f"  Prompt Tokens: {cb.prompt_tokens}")
                # logger.info(f"  Completion Tokens: {cb.completion_tokens}")
                # logger.info(f"  Total Tokens: {cb.total_tokens}")
                # logger.info(f"  Total Cost (USD): ${cb.total_cost:.6f}")
            
            # If we reach here, everything was successful, so break the retry loop
            break
        except ClosedResourceError as e:
            logger.error(f"ClosedResourceError on attempt {attempt + 1}: {e}")
            if client:
                try:
                    await client.close()
                except:
                    pass
            if attempt < max_retries - 1:
                logger.info(f"Retrying in {retry_delay} seconds...")
                await asyncio.sleep(retry_delay)
                continue
            else:
                logger.error("Max retries reached. Exiting.")
                raise
        except Exception as e:
            logger.error(f"Unexpected error on attempt {attempt + 1}: {e}")
            if client:
                try:
                    await client.close()
                except:
                    pass
            if attempt < max_retries - 1:
                logger.info(f"Retrying in {retry_delay} seconds...")
                await asyncio.sleep(retry_delay)
                continue
            else:
                logger.error("Max retries reached. Exiting.")
                raise
    
    # Clean up client connection when done
    if client:
        try:
            await client.close()
        except:
            pass

if __name__ == "__main__":
    asyncio.run(main())
