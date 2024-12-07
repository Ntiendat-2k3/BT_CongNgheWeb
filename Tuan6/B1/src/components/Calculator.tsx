import React, { useState } from "react";
import { evaluate } from "mathjs";
import Display from "./Display";
import Button from "./Button";

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>("");

  const handleClick = (label: string) => {
    if (label === "C") {
      setInput("");
    } else if (label === "=") {
      try {
        const result = evaluate(input);
        setInput(result.toString());
      } catch {
        setInput("Error");
      }
    } else {
      setInput(input + label);
    }
  };

  const buttons: string[] = [
    "C",
    "(",
    ")",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];

  return (
    <div className="max-w-md mx-auto mt-16 bg-white rounded-2xl shadow-2xl overflow-hidden">
      <Display value={input || "0"} />
      <div className="bg-gray-100 grid grid-cols-4 gap-2 p-4">
        {buttons.map((btn) => (
          <Button
            key={btn}
            label={btn}
            onClick={handleClick}
            className={btn === "0" ? "col-span-2" : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
