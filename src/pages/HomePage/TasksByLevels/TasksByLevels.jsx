import "./tasksByLevels.css";

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
          <div className="task-info-box">
            <div>
              <div className="status-priority">
                <div
                  className={`priority-box ${
                    info.priority.id === 1
                      ? "low-priority"
                      : info.priority.id === 2
                      ? "medium-priority"
                      : info.priority.id === 3
                      ? "high-priority"
                      : ""
                  }`}
                >
                  <img
                    src={info.priority.icon}
                    alt={`${info.priority.name} icon`}
                  />
                  <span>{info.priority.name}</span>
                </div>
                <div
                  className={`department ${
                    info.department.id === 1 || info.department.id === 2
                      ? "department-administration"
                      : info.department.id === 3 ||
                        info.department.id === 4 ||
                        info.department.id === 5
                      ? "department-finance"
                      : info.department.id === 6 || info.department.id === 7
                      ? "department-tech"
                      : ""
                  }`}
                >
                  <p>{info.department.name.split(" ")[0]}...</p>
                </div>
              </div>
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
        </div>
      ))}
    </div>
  );
}
