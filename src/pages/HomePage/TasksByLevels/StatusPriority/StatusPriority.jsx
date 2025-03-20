import "./statusPriority.css";

export default function StatusPriority({ data }) {
  return (
    <div className="status-priority">
      <div
        className={`priority-box ${
          data.priority.id === 1
            ? "low-priority"
            : data.priority.id === 2
            ? "medium-priority"
            : data.priority.id === 3
            ? "high-priority"
            : ""
        }`}
      >
        <img src={data.priority.icon} alt={`${data.priority.name} icon`} />
        <span>{data.priority.name}</span>
      </div>
      <div
        className={`department ${
          data.department.id === 1
            ? "department-administration"
            : data.department.id === 2
            ? "department-hr"
            : data.department.id === 3
            ? "department-finance"
            : data.department.id === 4
            ? "department-sale"
            : data.department.id === 5
            ? "department-logistic"
            : data.department.id === 6
            ? "department-tech"
            : data.department.id === 7
            ? "department-media"
            : ""
        }`}
      >
        <p>{data.department.name.split(" ")[0]}...</p>
      </div>
    </div>
  );
}
