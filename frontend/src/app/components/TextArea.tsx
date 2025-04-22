import React from "react";

interface TextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = ({ value, onChange }: TextAreaProps) => (
  <textarea
    value={value}
    onChange={onChange}
    rows={5}
    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    placeholder="Ask a question like: 'What do I need to travel from Kenya to Ireland?'"
  />
);
