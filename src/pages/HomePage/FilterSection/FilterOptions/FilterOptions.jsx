import "./filterOptions.css";

export default function FilterOptions({
  options,
  dep,
  selectedOptions,
  handleFilter,
  handleChange,
}) {
  return (
    <div className={`filterBy-container ${dep && "filterBy-dep"}`}>
      <div>
        {options.map((opt) => (
          <label key={opt.id} className={`checkbox`}>
            {opt.name}
            <input
              checked={!!selectedOptions[opt.id]}
              onChange={() => handleChange(opt.id)}
              type="checkbox"
            />
            <span className={`checkmark ${dep && "checkmark-dep"}`}></span>
          </label>
        ))}
      </div>
      <button onClick={handleFilter} className="btn-choose">
        არჩევა
      </button>
    </div>
  );
}
