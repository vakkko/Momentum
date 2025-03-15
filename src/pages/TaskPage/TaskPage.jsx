import { useContext, useEffect, useState } from "react";
import Department from "../../components/AddEmploy/Department/Department";
import "./taskPage.css";
import { DepContext } from "../../context/context";
import axios from "axios";
import WorkProgress from "./WorkProgress/WorkProgress";
import RespEmploy from "./RespEmploy/RespEmploy";

export default function TaskPage() {
  const [selectDepartment, setSelectedDepartment] = useState("");
  const [priorities, setPriorities] = useState([]);
  const [average, setAverage] = useState({});
  const [statuses, setStatuses] = useState([]);

  const contextData = useContext(DepContext);
  const departments = contextData.departments;

  const handleSelectedDep = (e) => {
    setSelectedDepartment(e.target.value);
  };

  useEffect(() => {
    Promise.all([
      axios.get("https://momentum.redberryinternship.ge/api/priorities"),
      axios.get("https://momentum.redberryinternship.ge/api/statuses"),
    ])
      .then(([prioritiesResp, statusesResp]) => {
        setPriorities(prioritiesResp.data);
        setStatuses(statusesResp.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const mediumPriority = priorities.find((prior) => prior.name === "საშუალო");
    if (mediumPriority) {
      setAverage(mediumPriority);
    }
  }, [priorities]);

  return (
    <div className="task-container">
      <h2>შექმენი ახალი დავალება</h2>
      <div className="task-inputs">
        <div>
          <label htmlFor="title">სათაური*</label>
          <br />
          <input id="title" type="text" minLength={3} maxLength={255} />
        </div>
        <Department
          taskPage={true}
          handleSelectedDep={handleSelectedDep}
          selectedDepartment={selectDepartment}
          departments={departments}
        />
        <div>
          <label htmlFor="description">აღწერა</label>
          <br />
          <textarea id="description"></textarea>
        </div>
        <RespEmploy selectDepartment={selectDepartment} />
        <WorkProgress
          average={average}
          statuses={statuses}
          priorities={priorities}
        />
        <button className="btn-create-task">დავალების შექმნა</button>
      </div>
    </div>
  );
}
