import { useState, ChangeEvent } from "react";
import axios from "axios";
import { TextArea } from "../components/TextArea";
import { Loader } from "../components/Loader";

export default function Home() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/query", { query });
      setResponse(res.data.response);
    } catch (err) {
      setResponse("Error fetching response.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen p-6 bg-gray-50 text-gray-800">
      <div className="max-w-2xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold">Travel Checklist Assistant</h1>
        <TextArea
          value={query}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setQuery(e.target.value)}
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
            <div className="whitespace-pre-line">{response}</div>
          </div>
        )}
      </div>
    </main>
  );
}
