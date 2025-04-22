from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import QueryRequest, QueryResponse, APIKeyRequest
from llm_client import ask_llm, set_api_key
import os

app = FastAPI(
    title="Travel Checklist Assistant API",
    description="Ask travel-related questions and get AI-generated checklists.",
    version="1.0.0",
    contact={
        "name": "Clayne Okallo",
        "email": "clayne.co25@gmail.com",
    },
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","https://pawa-solutions-entry.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/query", response_model=QueryResponse)
async def query_llm(data: QueryRequest):
    try:
        answer = await ask_llm(data.query)
        return {"response": answer}
    except Exception as e:
        import traceback
        traceback.print_exc()  # Log full traceback
        raise HTTPException(status_code=500, detail=f"LLM Error: {str(e)}")

@app.post("/set-api-key", summary="Set or update OpenAI API key", tags=["Settings"])
def update_key(req: APIKeyRequest):
    if not req.api_key.startswith("sk-"):
        raise HTTPException(status_code=400, detail="Invalid API key format.")
    set_api_key(req.api_key)
    return {"message": "API key set successfully."}

@app.get("/has-api-key", summary="Check if OpenAI API key is set", tags=["Settings"])
def has_api_key():
    from llm_client import OPENAI_API_KEY
    return {"has_key": bool(OPENAI_API_KEY)}