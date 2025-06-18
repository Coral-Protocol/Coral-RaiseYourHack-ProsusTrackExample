from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# FastAPI setup
app = FastAPI(title="Interface Agent API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model for FastAPI
class TextInput(BaseModel):
    text: str

# FastAPI endpoint
@app.post("/interface_agent")
async def interface_agent_endpoint(input_data: TextInput):
    try:
        user_input = input_data.text
        
        # Print what the user wrote
        print(f"User input received: {user_input}")
        logger.info(f"User input received: {user_input}")
        
        # Send back confirmation response
        response = {
            "message": "your message received",
            "received_text": user_input
        }
        
        return response
        
    except Exception as e:
        logger.error(f"Error processing request: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    print("FastAPI Interface Agent starting...")
    print("Endpoint available at: http://localhost:8000/interface_agent")
    print("Health check available at: http://localhost:8000/health")
    print("API docs available at: http://localhost:8000/docs")
    print("Send POST requests with JSON: {'text': 'your message here'}")
    uvicorn.run(app, host="0.0.0.0", port=8000) 