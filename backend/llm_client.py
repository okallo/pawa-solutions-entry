import os
import openai
from dotenv import load_dotenv

load_dotenv()


async def ask_llm(prompt: str) -> str:
        return "OpenAI API key is missing. Please check your configuration."

    try:
        print("[INFO] Calling OpenAI...")
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.6,
            max_tokens=150,
        )
        return response.choices[0].message.content.strip()

    except openai.APIError as e:
        code = getattr(e.response, "status_code", "N/A")
        try:
            message = e.response.json().get("error", {}).get("message", str(e))
        except Exception:
            message = str(e)
        print(f"[ERROR] OpenAI API Error - Code: {code}, Message: {message}")
        return f"OpenAI API Error:\n- Code: {code}\n- Message: {message}"

    except openai.OpenAIError as e:
        print(f"[ERROR] OpenAI Client Error: {e}")
        return f"OpenAI Client Error: {str(e)}"

    except Exception as e:
        print("[ERROR] Unexpected Error:", e)
        return f"Unexpected error occurred: {str(e)}"
