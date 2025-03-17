import "./filterOptions.css";

export default function FilterOptions({
  options,
  dep,
  selectedOptions,
  setSelectedOptions,
}) {
  const handleChange = (name) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className={`filterBy-container ${dep && "filterBy-dep"}`}>
      <div>
        {options.map((opt) => (
          <label key={opt.id} className={`checkbox`}>
            {opt.name}
            <input
              checked={!!selectedOptions[opt.id]}
              onChange={() => handleChange(opt.name)}
              type="checkbox"
            />
            <span className={`checkmark ${dep && "checkmark-dep"}`}></span>
          </label>
        ))}
      </div>
      <button className="btn-choose">არჩევა</button>
    </div>
  );
}
