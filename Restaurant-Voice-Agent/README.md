# Restaurant Voice Agent System

The Restaurant Voice Agent System is a multi-agent voice conversation system for restaurants that handles reservations, takeaway orders, and checkout through natural voice interactions. It features four specialized AI agents that seamlessly transfer conversations while maintaining context.

## Responsibility
A multi-agent voice system for restaurants, enabling natural, seamless voice-based reservations, orders, and payments by routing conversations between specialized agents.

## Details
- **Framework:** LiveKit Agents
- **Tools Used:** Deepgram STT, Cartesia TTS, OpenAI LLM, Silero VAD
- **AI Model:** GPT-4
- **Date Added:** January 2025
- **License:** MIT
- **Original Source:** [Restaurant Voice Agent System](https://github.com/livekit/agents/blob/main/examples/voice_agents/restaurant_agent.py)

## Use the Agent

### 1. Clone & Install Dependencies

Ensure that the [Coral Server](https://github.com/Coral-Protocol/coral-server) is running on your system. If you are trying to run Restaurant Voice Agent and require an input, you can either create your agent which communicates on the coral server or run and register the [Interface Agent](https://github.com/Coral-Protocol/Coral-Interface-Agent) on the Coral Server.

<details>

```bash
# In a new terminal clone the repository:
git clone https://github.com/Coral-Protocol/Restuarant-Voice-Agent.git

# Navigate to the project directory:
cd Restuarant-Voice-Agent
# Install `uv`:
pip install uv

# Install dependencies from `pyproject.toml` using `uv`:
uv sync
```

</details>

### 2. Configure Environment Variables

<details>

Copy the example file and add your API keys:

```bash
cp .env.example .env
```

Update `.env` with:
- `LIVEKIT_URL`
- `LIVEKIT_API_KEY` ([Get LiveKit API Key](https://cloud.livekit.io/))
- `LIVEKIT_API_SECRET` ([Get LiveKit API Secret](https://cloud.livekit.io/))
- `OPENAI_API_KEY` ([Get OpenAI API Key](https://platform.openai.com/api-keys))
- `DEEPGRAM_API_KEY` ([Get Deepgram API Key](https://deepgram.com/))
- `CARTESIA_API_KEY` ([Get Cartesia API Key](https://play.cartesia.ai/keys))

</details>

## 3. Run Agent
<details>

```bash
uv run python main.py console
```

</details>

## 4. Example
<details>

## Agent System

### 🏪 Greeter Agent
Welcomes customers, presents menu (Pizza $10, Salad $5, Ice Cream $3, Coffee $2), and routes to specialized agents.

### 📅 Reservation Agent
Handles dining reservations - collects time, customer name, and phone number.

### 🥡 Takeaway Agent
Processes food orders - takes orders from menu, clarifies requests, confirms details.

### 💳 Checkout Agent
Handles payments - calculates expenses, collects contact info and credit card details.

## Usage Examples

<details>

**Getting Started:**
1. Start the agent using `uv run python main.py console`
2. The Greeter Agent will automatically welcome you to the restaurant
3. Say "Hi!" or any greeting to initiate the conversation
4. The agent will then listen to other agent calling it (for example interface agent)
5. Continue your conversation naturally - the system will route you to the appropriate specialized agent

**Making a Reservation:**
1. Say: "I'd like to make a reservation"
2. The system routes you to the Reservation Agent
3. Provide preferred time, name, and phone
4. Confirm details

**Ordering Takeaway:**
1. Say: "I want to order food"
2. The system routes you to the Takeaway Agent
3. Place order from menu
4. Get routed to Checkout Agent for payment
5. Provide payment information and complete transaction

</details>

## Creator Details
- **Name:** Ahsen Tahir
- **Affiliation**: Coral Protocol
- **Contact**: [Discord](https://discord.com/invite/Xjm892dtt3)

