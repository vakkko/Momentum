import { useContext, useEffect, useState } from "react";
import Department from "../../components/AddEmploy/Department/Department";
import "./taskPage.css";
import { DepContext } from "../../context/context";
import axios from "axios";
import WorkProgress from "./WorkProgress/WorkProgress";
import RespEmploy from "./RespEmploy/RespEmploy";
import ErrorMsgs from "../../components/AddEmploy/NameInput/ErrorMsgs/ErrorMsgs";
import { useNavigate } from "react-router";

export default function TaskPage() {
  const [selectDepartment, setSelectedDepartment] = useState(
    sessionStorage.getItem("selectDepartment") || ""
  );
  const [priorities, setPriorities] = useState([]);
  const [average, setAverage] = useState({});
  const [statuses, setStatuses] = useState([]);
  const [title, setTitle] = useState(sessionStorage.getItem("title") || "");
  const [text, setText] = useState(sessionStorage.getItem("text") || "");
  const [status, setStatus] = useState();
  const [respEmpl, setRespEmpl] = useState(null);
  const [selected, setSelected] = useState(average);

  const contextData = useContext(DepContext);
  const departments = contextData.departments;
  const validText = text.trim().split(/\s+/);
  const navigate = useNavigate();

  const handleSelectedDep = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
  };

  const handleTextChange = (e) => {
    const value = e.target.value;
    setText(value);
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

  function padZero(num) {
    return String(num).padStart(2, "0");
  }

  useEffect(() => {
    if (statuses.length > 0) {
      setStatus(statuses[0].id);
    }
  }, [statuses]);

  const getDate = new Date();
  const year = getDate.getFullYear();
  const month = padZero(getDate.getMonth() + 1);
  const day = padZero(getDate.getDate());

  const tomorrow = `${year}-${month}-${padZero(getDate.getDate() + 1)}`;
  const today = `${year}-${month}-${day}`;

  const [date, setDate] = useState(sessionStorage.getItem("date") || tomorrow);

  useEffect(() => {
    setDate(tomorrow);
  }, [tomorrow]);

  const handleSubmit = async () => {
    if (
      title.length > 3 &&
      title.length < 255 &&
      (validText.length === 0 ||
        (validText.length >= 4 && validText.length < 255)) &&
      date &&
      status
    ) {
      const data = {
        name: title,
        description: text,
        due_date: date,
        status_id: Number(status),
        employee_id: Number(respEmpl.id),
        priority_id: Number(selected.id),
      };

      try {
        const response = await axios.post(
          "https://momentum.redberryinternship.ge/api/tasks",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer 9e6c1b92-a397-450d-8338-35b007457477`,
            },
          }
        );
        if (response.status === 201) {
          setText("");
          setTitle("");
          setDate(tomorrow);
          setStatus(0);
          setSelectedDepartment("");
          setSelected(average);
          setRespEmpl(null);
          navigate("/");
          sessionStorage.clear();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    sessionStorage.setItem("title", title);
    sessionStorage.setItem("text", text);
    sessionStorage.setItem("selectDepartment", selectDepartment);
    sessionStorage.setItem("date", date);
  }, [title, text, selectDepartment, date]);

  useEffect(() => {
    setTitle(sessionStorage.getItem("title"));
    setText(sessionStorage.getItem("text"));
    setSelectedDepartment(sessionStorage.getItem("selectDepartment"));
    setDate(sessionStorage.getItem("date"));
  }, []);

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
        <RespEmploy
          respEmpl={respEmpl}
          setRespEmpl={setRespEmpl}
          selectDepartment={selectDepartment}
        />
        <WorkProgress
          average={average}
          statuses={statuses}
          priorities={priorities}
          date={date}
          today={today}
          setDate={setDate}
          status={status}
          setStatus={setStatus}
          selected={selected}
          setSelected={setSelected}
        />
        <button onClick={handleSubmit} className="btn-create-task">
          დავალების შექმნა
        </button>
      </div>
    </div>
  );
}
