# Restaurant Agentic System Webapp

This project is a comprehensive restaurant voice agent system that combines Interface agent and Restaurant agent to connect via coral protocol to provide an intelligent conversational experience for restaurant interactions.

## 📋 Prerequisites

Before setting up this project, ensure you have the following installed:

- **Python 3.8+** with `uv` package manager
- **Node.js 18+** with npm
- **Git** for cloning repositories

## 🚀 Quick Start Guide

### Step 1: Setup Coral Server

First, you need to run the Coral server which will serve as a communication channel for our agents:

1. Clone and setup the Coral server:
```bash
git clone https://github.com/Coral-Protocol/coral-server
cd coral-server
# Follow the setup instructions in the coral-server repository
```

2. Start the Coral server (follow the specific instructions in the coral-server repository)

### Step 2: Environment Setup

You'll need to set up **three separate terminals** for each component:

#### Terminal 1: Coral Interface Agent
```bash
cd Coral-Interface-Agent
uv sync
```

#### Terminal 2: Restaurant Voice Agent  
```bash
cd Restaurant-Voice-Agent
uv sync
```

#### Terminal 3: UI Frontend
```bash
cd UI
npm install
```

### Step 3: Environment Configuration

#### For Coral Interface Agent
Create a `.env` file in the `Coral-Interface-Agent` directory based on the `.env.example` file:
```bash
cd Coral-Interface-Agent
cp .env.example .env
# Edit .env with your specific configuration
```

#### For Restaurant Voice Agent
Create a `.env` file in the `Restaurant-Voice-Agent` directory based on the `.env.example` file:
```bash
cd Restaurant-Voice-Agent  
cp .env.example .env
# Edit .env with your specific configuration
```

#### For UI Frontend
Create a `.env.local` file in the `UI` directory:
```bash
cd UI
# Create .env.local with your frontend environment variables
```

### Step 4: Running the Application

Start all three components in their respective terminals:

#### Terminal 1: Start Coral Interface Agent
```bash
cd Coral-Interface-Agent
uv run 0-langchain-interface.py
```

#### Terminal 2: Start Restaurant Voice Agent
```bash
cd Restaurant-Voice-Agent
uv run main.py dev
```

#### Terminal 3: Start UI Frontend
```bash
cd UI
npm run dev
```

## 🎯 Usage

1. **Access the Application**: Open your browser and navigate to the UI application (typically `http://localhost:3000`)

2. **Try Now Button**: Click the "Try Now" button to be directed to the main page

3. **Start Conversation**: On the main page, press the "Start Conversation" button for the restaurant agent

4. **Interact**: You can now chat with the agentic system for restaurant-related queries and interactions

## 🔧 Components Overview

### Coral Interface Agent
The interface agent handles conversation management and provides the core conversational AI capabilities. It serves as the middleware between the UI and the restaurant-specific logic.

### Restaurant Voice Agent  
The voice-enabled restaurant agent specializes in handling restaurant-specific queries, orders, reservations, and customer interactions with voice capabilities.

### UI Frontend
A modern Next.js application that provides the user interface for interacting with both agents.

## 📚 Additional Resources

For more detailed information about the individual components:

- **Restaurant Voice Agent**: [https://github.com/Coral-Protocol/Restaurant-Voice-Agent](https://github.com/Coral-Protocol/Restaurant-Voice-Agent)
- **Voice Interface Agent**: [https://github.com/Coral-Protocol/Voice-Interface-Agent](https://github.com/Coral-Protocol/Voice-Interface-Agent)
- **Coral Server**: [https://github.com/Coral-Protocol/coral-server](https://github.com/Coral-Protocol/coral-server)

## Check the Demo video:
[Demo](https://drive.google.com/file/d/1LtUfTUzV9MPEPY7b4alElDiJoml7E089/view)