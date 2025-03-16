import "./filterOptions.css";

export default function FilterOptions({ options, dep }) {
  return (
    <div className={`filterBy-container ${dep && "filterBy-dep"}`}>
      <div>
        {options.map((opt) => (
          <label key={opt.id} className={`checkbox`}>
            {opt.name}
            <input type="checkbox" />
            <span className={`checkmark ${dep && "checkmark-dep"}`}></span>
          </label>
        ))}
      </div>
      <button className="btn-choose">არჩევა</button>
    </div>
  );
}
