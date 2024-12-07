import React from "react";

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-right p-6 text-4xl font-mono rounded-t-md shadow-inner">
      {value}
    </div>
  );
};

export default Display;
