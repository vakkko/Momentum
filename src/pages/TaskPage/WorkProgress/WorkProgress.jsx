import { useEffect, useState } from "react";
import "./workProgress.css";

export default function WorkProgress({ average, priorities, statuses }) {
  const [selected, setSelected] = useState(average);
  const [isOpen, setIsOpen] = useState(false);

  function padZero(num) {
    return String(num).padStart(2, "0");
  }

  const getDate = new Date();
  const year = getDate.getFullYear();
  const month = padZero(getDate.getMonth() + 1);
  const day = padZero(getDate.getDate());

  const tomorrow = `${year}-${month}-${padZero(getDate.getDate() + 1)}`;
  const today = `${year}-${month}-${day}`;

  const [date, setDate] = useState(tomorrow);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  useEffect(() => {
    if (average) {
      setSelected(average);
    }
  }, [average]);

  useEffect(() => {
    setDate(tomorrow);
  }, [tomorrow]);

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
