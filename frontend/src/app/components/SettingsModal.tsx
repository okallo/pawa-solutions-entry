import React from "react";

interface SettingsModalProps {
  showSettings: boolean;
  keyInput: string;
  setKeyInput: React.Dispatch<React.SetStateAction<string>>;
  handleSaveKey: () => void;
  onCancel: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  showSettings,
  keyInput,
  setKeyInput,
  handleSaveKey,
  onCancel,
}) => (
  showSettings && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">Set OpenAI API Key</h2>
        <input
          type="text"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          placeholder="sk-..."
          className="w-full border p-2 rounded"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveKey}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded"
          >
            Save Key
          </button>
        </div>
      </div>
    </div>
  )
);
