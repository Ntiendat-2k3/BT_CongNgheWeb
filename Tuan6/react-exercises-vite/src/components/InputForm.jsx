import { useState } from "react";

function InputForm() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="mb-4 text-2xl text-xanh-than">Nhập liệu:</h2>
      <input
        type="text"
        placeholder="Nhập vào đây..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-64 p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-xanh-than"
      />
      <p className="text-gray-700">Giá trị đã nhập: {inputValue}</p>
    </div>
  );
}

export default InputForm;
