import "./header.css";

export default function Header() {
  return (
    <header>
      <img src="./assets/Frame 1000006027.svg" alt="icon" />
      <div>
        <button>თანამშრომლის შექმნა</button>
        <button className="btn-create-task">
          <img src="./assets/add.svg" alt="add icon" />
          შექმენი ახალი დავალება
        </button>
      </div>
    </header>
  );
}
