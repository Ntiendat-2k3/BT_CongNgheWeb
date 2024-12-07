import React from "react";

interface ButtonProps {
  label: string;
  onClick: (label: string) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className = "" }) => {
  const isOperator = ["+", "-", "*", "/", "="].includes(label);
  const isClear = label === "C";

  let bgColor = "";
  if (isOperator) {
    bgColor = "bg-gradient-to-r from-blue-500 to-blue-700";
  } else if (isClear) {
    bgColor = "bg-gradient-to-r from-red-500 to-red-700";
  } else {
    bgColor = "bg-gradient-to-r from-gray-500 to-gray-700";
  }

  return (
    <button
      onClick={() => onClick(label)}
      className={`text-white font-semibold text-xl py-3 px-4 m-2 rounded-lg shadow-md transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-mono ${bgColor} ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
