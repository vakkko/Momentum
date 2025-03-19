import "./leftContainer.css";
import StatusPriority from "../../HomePage/TasksByLevels/StatusPriority/StatusPriority";
import { useEffect, useState } from "react";
import axios from "axios";

export default function LeftContainer({ data }) {
  const [status, setStatus] = useState();

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    const updateStatus = async () => {
      const token = "9e6c1b92-a397-450d-8338-35b007457477";

      if (status === undefined) return;

      try {
        await axios.put(
          `https://momentum.redberryinternship.ge/api/tasks/${data.id}`,
          { status_id: status },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.error("Error updating status:", error);
      }
    };

    updateStatus();
  }, [status]);

  return (
    <div className="left-container">
      <div className="task-info">
        <StatusPriority data={data} />
        <h2>{data.name}</h2>
        <p>{data.description}</p>
      </div>
      <div className="task-details">
        <h3>დავალების დეტალები</h3>
        <div className="status-box">
          <div>
            <img src="./assets/pie-chart.svg" alt="pie chart" />
            <span>სტატუსი</span>
          </div>
          <select onChange={handleChange}>
            <option hidden>{data.status.name}</option>
            <option value="1">დასაწყები</option>
            <option value="2">პროგრესში</option>
            <option value="3">მზად ტესტირებისთვის</option>
            <option value="4">დასრულებული</option>
          </select>
        </div>
        <div className="user-info">
          <div className="user-icon">
            <img src="./assets/user.svg" alt="user icon" />
            <span>თანამშრომელი</span>
          </div>
          <div className="avatar-box">
            <img src={data.employee.avatar} alt="avatar" />
            <div>
              <span className="user-departament">{data.department.name}</span>{" "}
              <br />
              <span className="user-fullname">
                {data.employee.name} {data.employee.surname}
              </span>
            </div>
          </div>
        </div>
        <div className="deadline-box">
          <div>
            <img src="./assets/calendar.svg" alt="calendar icon" />
            <span>დავალების ვადა</span>
          </div>
          <p>
            {new Date(data.due_date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
