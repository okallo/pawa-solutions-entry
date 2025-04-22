from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import QueryRequest, QueryResponse
from llm_client import ask_llm
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
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

