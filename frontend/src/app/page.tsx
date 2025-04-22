"use client";

import { useState, ChangeEvent } from "react";
import axios from "axios";
import { TextArea } from "./components/TextArea";
import { Loader } from "./components/Loader";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{ q: string; a: string }[]>([]);

  const handleSubmit = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/query", { query });
      setResponse(res.data.response);
      setHistory(prev => [{ q: query, a: res.data.response }, ...prev]);
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
        {/* Sidebar: Previous Queries */}
        <aside className="col-span-1 bg-white p-4 rounded shadow h-fit">
          <h2 className="text-lg font-semibold mb-4">Previous Queries</h2>
          {history.length === 0 ? (
            <p className="text-sm text-gray-500">No previous queries yet.</p>
          ) : (
            <div className="space-y-2">
              {history.map((item, index) => (
                <details key={index} className="border rounded">
                  <summary className="cursor-pointer px-2 py-1 font-medium text-blue-600">
                    Q: {item.q}
                  </summary>
                  <div className="p-2 text-sm text-gray-700 prose max-w-none">
                    <ReactMarkdown>{item.a}</ReactMarkdown>
                  </div>
                </details>
              ))}
            </div>
          )}
        </aside>

        {/* Main Chat Area */}
        <section className="col-span-1 md:col-span-3 space-y-4">
          <h1 className="text-3xl font-bold">Travel Checklist Assistant</h1>
          <TextArea
            value={query}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setQuery(e.target.value)
            }
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Ask
          </button>

          {loading && <Loader />}

          {response && (
            <div className="mt-4 bg-white p-4 rounded shadow">
              <h2 className="font-semibold text-xl mb-2">Response:</h2>
              <div className="prose prose-blue max-w-none">
                <ReactMarkdown>{response}</ReactMarkdown>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
