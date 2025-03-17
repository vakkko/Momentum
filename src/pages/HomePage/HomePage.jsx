import { useContext, useEffect, useState } from "react";
import FilterSection from "./FilterSection/FilterSection";
import { DepContext } from "../../context/context";
import axios from "axios";
import TasksByLevels from "./TasksByLevels/TasksByLevels";
import "./homepage.css";

export default function HomePage() {
  const [showDepartments, setShowDepartments] = useState(false);
  const [showPriorities, setShowPriorities] = useState(false);
  const [showEmployees, setShowEmployess] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const contextData = useContext(DepContext);
  const departments = contextData.departments;
  const [allTask, setAllTask] = useState([]);
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

        setAllTask(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterToStart = allTask.filter((tasks) => {
      return tasks.status.id === 1;
    });

    const filterInProgress = allTask.filter((task) => {
      return task.status.id === 2;
    });

    const filterToTest = allTask.filter((task) => {
      return task.status.id === 3;
    });

    const filterFinish = allTask.filter((task) => {
      return task.status.id === 4;
    });

    setToStart(filterToStart);
    setInProgress(filterInProgress);
    setToTest(filterToTest);
    setFinished(filterFinish);
  }, [allTask]);

  return (
    <>
      <FilterSection
        showDepartments={showDepartments}
        setShowDepartments={setShowDepartments}
        showPriorities={showPriorities}
        setShowPriorities={setShowPriorities}
        showEmployees={showEmployees}
        setShowEmployess={setShowEmployess}
        departments={departments}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
      <div className="task-columns">
        <TasksByLevels level={toStart} />
        <TasksByLevels level={inProgress} />
        <TasksByLevels level={toTest} />
        <TasksByLevels level={finished} />
      </div>
    </>
  );
}
