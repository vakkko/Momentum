import { useContext, useEffect, useState } from "react";
import Department from "../../components/AddEmploy/Department/Department";
import "./taskPage.css";
import { DepContext } from "../../context/context";
import axios from "axios";
import WorkProgress from "./WorkProgress/WorkProgress";
import RespEmploy from "./RespEmploy/RespEmploy";
import ErrorMsgs from "../../components/AddEmploy/NameInput/ErrorMsgs/ErrorMsgs";

export default function TaskPage() {
  const [selectDepartment, setSelectedDepartment] = useState("");
  const [priorities, setPriorities] = useState([]);
  const [average, setAverage] = useState({});
  const [statuses, setStatuses] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const contextData = useContext(DepContext);
  const departments = contextData.departments;

  const handleSelectedDep = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
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

  const validText = text.trim().split(/\s+/);

  return (
    <div className="task-container">
      <h2>შექმენი ახალი დავალება</h2>
      <div className="task-inputs">
        <div>
          <label htmlFor="title">სათაური*</label>
          <br />
          <input
            value={title}
            onChange={handleTitleChange}
            id="title"
            type="text"
            minLength={3}
            maxLength={255}
          />
          <ErrorMsgs msg={"მინიმუმ 3 სიმბოლო"} validate={title} checkOn={3} />
        </div>
        <div>
          <Department
            taskPage={true}
            handleSelectedDep={handleSelectedDep}
            selectedDepartment={selectDepartment}
            departments={departments}
          />
          <div
            className={`err-container ${
              selectDepartment ? "validate-dep" : ""
            }`}
          >
            <svg
              width="14"
              height="10"
              viewBox="0 0 14 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.3327 1L4.99935 8.33333L1.66602 5"
                stroke="#6C757D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p>გთხოვთ აირჩიოთ დეპარტამენტი</p>
          </div>
        </div>
        <div>
          <label htmlFor="description">აღწერა</label>
          <br />
          <textarea
            value={text}
            onChange={handleTextChange}
            id="description"
          ></textarea>
          <div className="err-container desciption-err">
            <p
              className={`${
                validText[0].length === 0
                  ? ""
                  : validText.length < 4 && validText[0].length > 0
                  ? "not-validate"
                  : validText.length >= 4
                  ? "validate"
                  : ""
              }`}
            >
              აღწერის შემთხვევაში სავალდებულოა 4 სიტყვა მაინც
            </p>
            <p
              className={`${
                validText[0].length === 0
                  ? ""
                  : validText.length > 0 && validText.length < 255
                  ? "validate"
                  : "not-validate"
              }`}
            >
              მაქსიმუმ 255 სიტყვა
            </p>
          </div>
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
