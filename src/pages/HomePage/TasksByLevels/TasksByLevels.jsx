import StatusPriority from "./StatusPriority/StatusPriority";
import "./tasksByLevels.css";
import { Link } from "react-router";

export default function TasksByLevels({ level }) {
  return (
    <div className="tasks-by-level">
      {level.map((info, index) => (
        <div
          className={`task-info-container ${
            info.status.id === 1
              ? "to-start-container"
              : info.status.id === 2
              ? "inProgress-container"
              : info.status.id === 3
              ? "to-test-container"
              : info.status.id === 4
              ? "finished-container"
              : ""
          }`}
          key={info.id}
        >
          {index === 0 && (
            <div className="title-box">
              <p>{info.status.name}</p>
            </div>
          )}
          <Link state={{ data: info }} to={`/tasks/${info.employee.id}`}>
            <div className="task-info-box">
              <div>
                <StatusPriority data={info} />
                <p className="date">
                  {new Date(info.due_date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="title-description">
                <h3>{info.name}</h3>
                <p>{info.description}</p>
              </div>
              <div className="avatar-comment">
                <img src={info.employee.avatar} alt="avatar" />
                <div>
                  <img src="./assets/message-icon.svg" alt="message icon" />
                  <span>{info.total_comments}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
