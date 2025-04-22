import React, { ChangeEvent } from "react";
import { TextArea } from "./TextArea";
import { Loader } from "./Loader";
import ReactMarkdown from "react-markdown";

interface ChatAreaProps {
  query: string;
  response: string;
  loading: boolean;
  history: { q: string; a: string }[];
  setQuery: (query: string) => void;
  handleSubmit: () => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  query,
  response,
  loading,
  setQuery,
  handleSubmit,
}) => (
  <section className="col-span-1 md:col-span-3 space-y-4">
    <h1 className="text-3xl font-bold">Travel Checklist Assistant</h1>
    <TextArea value={query} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setQuery(e.target.value)} />
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
);
