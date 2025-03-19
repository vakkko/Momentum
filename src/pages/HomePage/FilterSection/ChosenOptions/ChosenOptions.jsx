import "./chosenOptions.css";

export default function ChosenOptions({ chosenOptions }) {
  return (
    <div className="chosen-options">
      {chosenOptions.map((opt, index) => (
        <div key={index}>
          <span>{opt.name}</span>
          <button>
            <img src="./assets/x.svg" alt="x" />
          </button>
        </div>
      ))}
      {chosenOptions.length > 0 && <button>გასუფთავება</button>}
    </div>
  );
}
