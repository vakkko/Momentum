import { useContext, useEffect } from "react";
import FilterSection from "../../components/FilterSection/FilterSection";
import { DepContext } from "../../context/context";
import axios from "axios";

export default function HomePage() {
  const contextData = useContext(DepContext);
  const departments = contextData.departments;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "9e6c1b92-a397-450d-8338-35b007457477";

        const response = await axios.get(
          "https://momentum.redberryinternship.ge/api/tasks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <FilterSection departments={departments} />
    </>
  );
}
