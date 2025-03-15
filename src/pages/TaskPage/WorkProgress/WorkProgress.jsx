import { useEffect, useState } from "react";
import "./workProgress.css";

export default function WorkProgress({ average, priorities, statuses }) {
  const [selected, setSelected] = useState(average);
  const [isOpen, setIsOpen] = useState(false);

  function padZero(num) {
    return String(num).padStart(2, "0");
  }

  const date = new Date();
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());

  const tomorrow = `${year}-${month}-${padZero(date.getDate() + 1)}`;
  const today = `${year}-${month}-${day}`;

  useEffect(() => {
    if (average) {
      setSelected(average);
    }
  }, [average]);

  return (
    <>
      <div className="workProgress-container">
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="priorities-container"
        >
          <span>პრიორიტეტი*</span>
          <br />
          <div className={`${isOpen ? "open" : ""}`}>
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
          <select>
            {statuses.map((status) => (
              <option key={status.id} id={status.id} value={status.name}>
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
            defaultValue={tomorrow}
            min={today}
            required
          />
        </div>
      </div>
    </>
  );
}
