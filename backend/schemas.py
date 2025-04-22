from pydantic import BaseModel, Field

class QueryRequest(BaseModel):
    query: str = Field(..., example="What documents do I need to travel from Kenya to Ireland?")

class QueryResponse(BaseModel):
    response: str = Field(..., example="You will need a valid passport, a visa, proof of accommodation...")

class APIKeyRequest(BaseModel):
    api_key: str = Field(..., min_length=10, example="sk-YourOpenAIKeyHere")
