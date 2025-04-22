export const Loader = () => (
    <div className="flex items-center space-x-2 text-sm text-gray-500">
      <svg className="w-6 h-6 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        />
      </svg>
      <span>Fetching AI response...</span>
    </div>
  );
  