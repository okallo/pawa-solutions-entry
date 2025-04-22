"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { TextArea } from "./TextArea";
import { Loader } from "./Loader";
import ReactMarkdown from "react-markdown";
import { PreviousQueries } from "./PreviousQueries";
import { ChatArea } from "./ChatArea";
import { SettingsModal } from "./SettingsModal";

export default function Home() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{ q: string; a: string }[]>([]);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [keyInput, setKeyInput] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Load API key from localStorage on first render
  useEffect(() => {
    const storedKey = localStorage.getItem("OPENAI_API_KEY");
    if (storedKey) {
      setApiKey(storedKey);
      axios.post(`${API_URL}/set-api-key`, { api_key: storedKey });
    } else {
      setShowSettings(true); // prompt user on first visit
    }
  }, []);

  const handleSaveKey = async () => {
    try {
      await axios.post(`${API_URL}/set-api-key`, { api_key: keyInput });
      localStorage.setItem("OPENAI_API_KEY", keyInput);
      setApiKey(keyInput);
      setShowSettings(false);
    } catch (err) {
      alert("Failed to set API key. Please check the format and try again.");
    }
  };

  const handleSubmit = async () => {
    if (!apiKey) {
      alert("Please set your OpenAI API key in Settings first.");
      return;
    }

    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/query`, { query });
      setResponse(res.data.response);
      setHistory((prev) => [{ q: query, a: res.data.response }, ...prev]);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setResponse(
          `Error ${err.response.status}: ${
            err.response.data?.detail || err.response.statusText
          }`
        );
      } else if (err instanceof Error) {
        setResponse(err.message);
      } else {
        setResponse("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <PreviousQueries history={history} onShowSettings={() => setShowSettings(true)} />
        <ChatArea query={query} response={response} loading={loading} setQuery={setQuery} handleSubmit={handleSubmit} history={[]} />
      </div>
      <SettingsModal
        showSettings={showSettings}
        keyInput={keyInput}
        setKeyInput={setKeyInput}
        handleSaveKey={handleSaveKey}
        onCancel={() => setShowSettings(false)}
      />
    </main>
  );
}
