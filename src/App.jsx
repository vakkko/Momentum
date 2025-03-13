import Header from "./components/Header/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router";
import { DepContext } from "./context/context";

function App() {
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    axios
      .get("https://momentum.redberryinternship.ge/api/departments")
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <DepContext.Provider value={departments}>
      <Header departments={departments} />
      <Outlet />
    </DepContext.Provider>
  );
}

export default App;
