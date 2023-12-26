import { useState } from "react";

export function ErrorBoundary({ children }) {
  const [hasError, setError] = useState(false);

  try {
    return children;
  } catch (e) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <h2 className="text-xl text-primary">Something went wrong</h2>
        <p className="text-secondary">
          Check the console for more informations.
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setError(false)}
        >
          Try again
        </button>
      </div>
    );
  }
}
