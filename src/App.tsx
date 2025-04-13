import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-amber-100">
      <h1 className="text-4xl font-bold text-blue-600">
        Vite + React + Tailwind CSS
      </h1>
      <p className="mt-4 text-lg text-gray-700">
        Click the button to increase the count:
      </p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => setCount((prev) => prev + 1)}
      >
        Count is: {count}
      </button>
    </main>
  );
}

export default App;
