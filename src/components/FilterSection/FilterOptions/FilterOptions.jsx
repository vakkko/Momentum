import "./filterOptions.css";

export default function FilterOptions({ options, dep }) {
  return (
    <div className="filterBy-container">
      <div>
        {options.map((opt) => (
          <label
            key={opt.id}
            className={`checkbox ${dep ? "checkbox-department" : ""}`}
          >
            {opt.name}
            <input type="checkbox" />
            <span className="checkmark"></span>
          </label>
        ))}
      </div>
      <button className="btn-choose">არჩევა</button>
    </div>
  );
}
