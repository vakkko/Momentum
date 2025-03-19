import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HashRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage/HomePage.jsx";
import TaskPage from "./pages/TaskPage/TaskPage.jsx";
import EmployTask from "./pages/EmployTask/EmployTask.jsx";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/add-task" element={<TaskPage />} />
          <Route path="/tasks/:employeeId" element={<EmployTask />} />
        </Route>
      </Routes>
    </StrictMode>
  </HashRouter>
);
