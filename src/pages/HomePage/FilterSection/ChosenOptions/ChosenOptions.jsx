import "./chosenOptions.css";

export default function ChosenOptions({
  chosenOptions,
  setChosenOptions,
  handleRemove,
}) {
  const handleClick = () => {
    setChosenOptions([]);
  };
  return (
    <div className="chosen-options">
      {chosenOptions.map((opt, index) => (
        <div key={index}>
          <span>{opt.name}</span>
          <button
            onClick={() => {
              handleRemove(opt.category, opt.id);
            }}
          >
            <img src="./assets/x.svg" alt="x" />
          </button>
        </div>
      ))}
      {chosenOptions.length > 0 && (
        <button onClick={handleClick}>გასუფთავება</button>
      )}
    </div>
  );
}
