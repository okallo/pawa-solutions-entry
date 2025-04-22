import React from "react";
import ReactMarkdown from "react-markdown";


interface HistoryItem {
  q: string;
  a: string;
}

interface PreviousQueriesProps {
  history: HistoryItem[];
  onShowSettings: () => void;
}

export const PreviousQueries: React.FC<PreviousQueriesProps> = ({ history, onShowSettings }) => (
  <aside className="col-span-1 bg-white p-4 rounded shadow h-fit">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">Previous Queries</h2>
      <button
        onClick={onShowSettings}
        className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
      >
        ⚙️ Settings
      </button>
    </div>
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
);
