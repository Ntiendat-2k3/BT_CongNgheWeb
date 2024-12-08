import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import Counter from "./components/Counter";
import TaskList from "./components/TaskList";
import InputForm from "./components/InputForm";
import ToggleText from "./components/ToggleText";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container p-4 mx-auto">
          <Routes>
            <Route path="/" element={<Welcome name="NTiến Đạt" />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/input" element={<InputForm />} />
            <Route path="/toggle" element={<ToggleText />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
