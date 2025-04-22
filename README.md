# 🌍 Travel Checklist Assistant (LLM-powered)

A full-stack AI-powered web app built with _FastAPI_, _Next.js_, and _TailwindCSS_ to help users generate personalized travel document checklists.



# 🧠 Use Case

Users can input travel-related questions such as:

> "What documents do I need to travel from Kenya to Ireland?"

The app will return a structured checklist, including:

- Passport validity
- Visa requirements
- Supporting documents
- Travel advisories



# 💻 Tech Stack

- **Backend**: FastAPI (Python), OpenAI GPT-3.5 Turbo
- **Frontend**: Next.js 14, TailwindCSS
- **LLM Integration**: ChatGPT (OpenAI Free Tier)



# 📁 Project Structure

```bash
/backend    # FastAPI application
/frontend   # Next.js + TailwindCSS frontend
```



# 🚀 Running the App

## 1. Backend Setup

- Ensure you have a valid **OpenAI API Key**
- Update your `.env` file inside `/backend`:

```env
OPENAI_API_KEY=your_openai_key_here
```

Then run the backend:

```bash
cd backend
# Activate your Python environment
source venv/Scripts/activate  # For Git Bash on Windows, or use `source venv/bin/activate` on Linux/macOS

# Start the FastAPI app
uvicorn main:app --reload
```

## 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```



# 🔐 API Key Management (Frontend)

- On **first run**, the user is prompted to enter an **OpenAI API Key** through a settings modal.
- The key is **securely stored in the browser’s localStorage** and automatically sent to the backend.
- If the key is invalid or needs updating, the user can open the **Settings** modal to change it at any time.



# 🛠️ Additional Notes

- **Frontend and Backend Communication**: The frontend makes POST requests to the FastAPI backend to handle user queries.
- **Environment Variables**: Store your OpenAI key in both `.env` (for backend testing) and via the browser (for live usage).
- **CORS** is enabled for local development.