import { useContext, useEffect, useState } from "react";
import FilterSection from "./FilterSection/FilterSection";
import { DepContext } from "../../context/context";
import axios from "axios";
import TasksByLevels from "./TasksByLevels/TasksByLevels";
import "./homepage.css";

export default function HomePage() {
  const contextData = useContext(DepContext);
  const departments = contextData.departments;
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [toStart, setToStart] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [toTest, setToTest] = useState([]);
  const [finished, setFinished] = useState([]);

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
        setAllTasks(response.data);
        setFilteredTasks(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterToStart = filteredTasks.filter((tasks) => {
      return tasks.status.id === 1;
    });

    const filterInProgress = filteredTasks.filter((task) => {
      return task.status.id === 2;
    });

    const filterToTest = filteredTasks.filter((task) => {
      return task.status.id === 3;
    });

    const filterFinish = filteredTasks.filter((task) => {
      return task.status.id === 4;
    });

    setToStart(filterToStart);
    setInProgress(filterInProgress);
    setToTest(filterToTest);
    setFinished(filterFinish);
  }, [filteredTasks]);

  return (
    <>
      <FilterSection
        departments={departments}
        allTasks={allTasks}
        setFilteredTasks={setFilteredTasks}
      />
      <div className="task-columns">
        {toStart.length > 0 && <TasksByLevels level={toStart} />}
        {inProgress.length > 0 && <TasksByLevels level={inProgress} />}
        {toTest.length > 0 && <TasksByLevels level={toTest} />}
        {finished.length > 0 && <TasksByLevels level={finished} />}
      </div>
    </>
  );
}
