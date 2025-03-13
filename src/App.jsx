import "./App.css";
import FilterSection from "./components/FilterSection/FilterSection";
import Header from "./components/Header/Header";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    axios
      .get("https://momentum.redberryinternship.ge/api/departments")
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Header departments={departments} />
      <FilterSection departments={departments} />
    </>
  );
}

export default App;
