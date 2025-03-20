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
            {opt.name} {opt.surname && opt.surname}
            <input
              checked={!!selectedOptions[opt.id]}
              onChange={() => handleChange(opt.id)}
              type="checkbox"
            />
            <span className={`checkmark ${dep && "checkmark-dep"}`}></span>
            {opt.avatar && (
              <img className="avatar" src={opt.avatar} alt="avatar" />
            )}
          </label>
        ))}
      </div>
      <button onClick={handleFilter} className="btn-choose">
        არჩევა
      </button>
    </div>
  );
}
