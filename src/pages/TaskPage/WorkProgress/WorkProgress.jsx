import { useEffect, useState } from "react";
import "./workProgress.css";

export default function WorkProgress({
  average,
  priorities,
  statuses,
  date,
  today,
  setDate,
  status,
  setStatus,
  selected,
  setSelected,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  useEffect(() => {
    if (average) {
      setSelected(average);
    }
  }, [average, setSelected]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <>
      <div className="workProgress-container">
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <span>პრიორიტეტი*</span>
          <br />
          <div className={`priorities-container ${isOpen ? "open" : ""}`}>
            <div>
              <img
                className="prior-icon"
                src={selected.icon}
                alt={selected.name}
              />
              <span>{selected.name}</span>
            </div>
            <img
              className="down-arrow"
              src="./assets/down-arrow.svg"
              alt="down-arrow"
            />
          </div>

          {isOpen && (
            <ul>
              {priorities.map((priority) => (
                <li onClick={() => setSelected(priority)} key={priority.id}>
                  <img src={priority.icon} alt={priority.name} />
                  {priority.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label>სტატუსი *</label> <br />
          <select value={status} onChange={handleStatusChange}>
            {statuses.map((status) => (
              <option key={status.id} id={status.id} value={Number(status.id)}>
                {status.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <div>
          <label htmlFor="date">დედლაინი</label> <br />
          <input
            id="date"
            type="date"
            min={today}
            value={date}
            required
            onChange={handleDateChange}
          />
        </div>
      </div>
    </>
  );
}
