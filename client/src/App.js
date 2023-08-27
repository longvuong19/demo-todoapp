import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.js";
import Home from "./pages/Home.js";
import Task from "./pages/Task.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/task/:id" element={<Task />} />
      </Routes>
    </Router>
  );
}

export default App;
