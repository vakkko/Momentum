import Header from "./components/Header/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router";
import { DepContext } from "./context/context";

function App() {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("https://momentum.redberryinternship.ge/api/departments")
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error(err));
    const fetchData = async () => {
      try {
        const token = "9e6c1b92-a397-450d-8338-35b007457477";

        const response = await axios.get(
          "https://momentum.redberryinternship.ge/api/employees",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DepContext.Provider value={{ departments, employees, setEmployees }}>
      <Header departments={departments} />
      <Outlet />
    </DepContext.Provider>
  );
}

export default App;
