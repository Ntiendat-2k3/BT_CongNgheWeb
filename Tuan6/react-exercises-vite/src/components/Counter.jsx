import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="mb-4 text-2xl">Bộ đếm: {count}</h2>
      <button
        onClick={handleIncrease}
        className="px-4 py-2 text-white transition rounded bg-xanh-than hover:bg-blue-700"
      >
        Tăng
      </button>
    </div>
  );
}

export default Counter;
