import "./filterOptions.css";

export default function FilterOptions({ options }) {
  return (
    <div className="filterBy-container">
      <div>
        {options.map((opt) => (
          <label key={opt.id} className={`checkbox`}>
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
