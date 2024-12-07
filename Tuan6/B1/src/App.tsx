import "./assets/styles/reset.css";
import "./index.css";
import React from "react";
import Calculator from "./components/Calculator";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center p-4">
      <Calculator />
    </div>
  );
};

export default App;
