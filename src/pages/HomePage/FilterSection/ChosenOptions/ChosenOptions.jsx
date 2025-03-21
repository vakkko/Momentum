import "./chosenOptions.css";

export default function ChosenOptions({
  chosenOption,
  handleRemove,
  // handleFilter,
}) {
  return (
    <div className="chosen-options">
      {chosenOption.map((opt, index) => (
        <div key={index}>
          <span>{opt.name}</span>
          <button onClick={() => handleRemove(opt.category, opt.id)}>
            <img src="./assets/x.svg" alt="x" />
          </button>
        </div>
      ))}
    </div>
  );
}
