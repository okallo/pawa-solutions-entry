import os
import openai
from openai import OpenAIError
from dotenv import load_dotenv

load_dotenv()

USE_OPENAI = os.getenv("USE_OPENAI", "false").lower() == "true"

print("USE_OPENAI:", USE_OPENAI)



async def ask_llm(prompt: str) -> str:
    print("Using OpenAI:", USE_OPENAI)

        try:
            print("Calling OpenAI...")
            response = openai.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.6,
                max_tokens=150,
            )
            return response.choices[0].message.content.strip()

        except openai.APIError as e:
            # Extract HTTP error code and response message for clear communication
            code = getattr(e.response, "status_code", "N/A")
            message = e.response.json().get("error", {}).get("message", str(e))
            print(f"OpenAI API Error - Code: {code}, Message: {message}")
            return f"OpenAI API Error - Code: {code}, Message: {message}"

        except Exception as e:
            print("Unexpected error:", e)
            return f"Unexpected OpenAI error: {str(e)}"

    return "OpenAI is not enabled or API key is missing."
