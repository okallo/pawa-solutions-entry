# 🌍 Travel Checklist Assistant (LLM-powered)

A full-stack web app built with _FastAPI_, _Next.js_, and _TailwindCSS_ to help users generate AI-powered travel document checklists.

# 🧠 Use Case

Users can input travel-related questions such as:

> "What documents do I need to travel from Kenya to Ireland?"

The app will generate a structured response, for example:

- Passport validity
- Visa requirements
- Supporting documents
- Travel advisories

# 💻 Tech Stack

- _Backend_: FastAPI (Python), OpenAI GPT-3.5 Turbo
- _Frontend_: Next.js 14, TailwindCSS
- _LLM Integration_: ChatGPT (OpenAI Free Tier)

# 📁 Project Structure

- /backend # FastAPI application
- /frontend # Next.js + TailwindCSS frontend

# 🚀 Running the App

1.  _Backend Setup_

- Ensure you have a valid _OpenAI API Key_. Update the key in the `.env` file located in the `/backend` folder.

```bash
# Navigate to the backend directory
cd backend

# Run the FastAPI app with Uvicorn
uvicorn main:app --reload

2. Frontend Setup

# Navigate to the frontend directory
cd frontend

# Install dependencies and run the Next.js app
npm install
npm run dev


# 🛠️ Additional Notes
Environment Variables: Make sure to add your OpenAI API Key to the .env file in the /backend directory.

Frontend and Backend Communication: The frontend will make API calls to the FastAPI backend to process user input and generate the checklist.

```
