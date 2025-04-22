import React from "react";

export const TextArea = ({ value, onChange }: { value: string; onChange: any }) => (
  <textarea
    value={value}
    onChange={onChange}
    rows={5}
    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    placeholder="Ask a question like: 'What do I need to travel from Kenya to Ireland?'"
  />
);
