import openai
import os
from dotenv import load_dotenv

load_dotenv()

async def ask_llm(prompt: str) -> str:
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  
        messages=[{"role": "user", "content": prompt}],
        temperature=0.6,
    )
    return response.choices[0].message['content'].strip()
