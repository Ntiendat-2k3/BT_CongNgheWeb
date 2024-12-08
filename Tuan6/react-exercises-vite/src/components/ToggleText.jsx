import { useState } from "react";

function ToggleText() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleParagraph = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <button
        onClick={toggleParagraph}
        className="px-4 py-2 text-white transition rounded bg-xanh-than hover:bg-blue-700"
      >
        {isVisible ? "Ẩn" : "Hiển thị"}
      </button>
      {isVisible && (
        <p className="max-w-md mt-4 text-center text-gray-700">
          Đây là đoạn văn bản được hiển thị hoặc ẩn khi nhấn nút.
        </p>
      )}
    </div>
  );
}

export default ToggleText;
