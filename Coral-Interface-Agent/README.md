## [Interface Agent](https://github.com/Coral-Protocol/Coral-Interface-Agent)

User Interaction Agent is the main interface for receiving user instructions, coordinating multi-agent tasks, and logging conversations via the terminal.

## Responsibility
User Interaction Agent acts as the main interface for coordinating user instructions and managing multi-agent tasks. It interacts with the user via terminal and orchestrates requests among various agents, ensuring seamless workflow and conversation logging.

## Details
- **Framework**: LangChain
- **Tools used**: Coral MCP Tools, ask_human Tool (human-in-the-loop)
- **AI model**: Groq LLM
- **Date added**: June 4, 2025
- **License**: MIT 

## Use the Agent in Orchestration
You will need to have API keys from [Groq](https://console.groq.com/keys).

### Executable Agent Definition 
```yaml
coral-interface:
  options:
    - name: "GROQ_API_KEY" 
      type: "string"
      description: "Groq API Key"
  runtime:
    type: "executable"
    command:
      - "bash"
      - "-c"
      - "cd ../Coral-Interface-Agent && uv sync && uv run python 0-langchain-interface.py"
    environment:
      - name: "GROQ_API_KEY"
        from: "GROQ_API_KEY" 
```

### Docker Agent Definition 
```yaml
interface:
  options:
    - name: "GROQ_API_KEY"
      type: "string"
      description: "Groq API Key"
    - name: "HUMAN_RESPONSE"
      type: "string"
      description: "Human response to be used in the interface agent"

  runtime:
    type: "docker"
    image: "sd2879/coral-interface-agent:latest"
    environment:
      - name: "GROQ_API_KEY"
        from: "GROQ_API_KEY" 
```

## Use the Agent  

### 1. Clone & Install Dependencies


<details>  

Ensure that the [Coral Server](https://github.com/Coral-Protocol/coral-server) is running on your system. If you are trying to run Interface agent and require coordination with other agents, you can run additional agents that communicate on the coral server.

```bash
# In a new terminal clone the repository:
git clone https://github.com/Coral-Protocol/Coral-Interface-Agent.git

# Navigate to the project directory:
cd Coral-Interface-Agent

# Install `uv`:
pip install uv

# Install dependencies from `pyproject.toml` using `uv`:
uv sync
```

</details>
 

### 2. Configure Environment Variables

<details>
 
Get the API Key:
[Groq](https://console.groq.com/keys)


```bash
# Create .env file in project root
cp -r .env_sample .env
```
</details>


### 3. Run Agent

<details>

```bash
# Run the agent using `uv`:
uv run python 0-langchain-interface.py
```
</details>


### 4. Example

<details>


```bash
# Input:
Agent: How can I assist you today?

#Output:
The agent will interact with you directly in the console and coordinate with other agents as needed.
```
</details>


## Creator Details
- **Name**: Suman Deb
- **Affiliation**: Coral Protocol
- **Contact**: [Discord](https://discord.com/invite/Xjm892dtt3)
