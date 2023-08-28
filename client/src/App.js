import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login.js";
import Home from "./pages/Home.js";
import Task from "./pages/Task.js";
import TaskCreate from "./pages/TaskCreate.js";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Navigate to="/home" />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
        <Route
          path="/task/:id"
          element={user ? <Task /> : <Navigate to="/" />}
        />
        <Route
          path="/task/create"
          element={user ? <TaskCreate /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
