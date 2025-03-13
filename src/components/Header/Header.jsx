import { useState } from "react";
import "./header.css";
import AddEmploy from "../AddEmploy/AddEmploy";

export default function Header({ departments }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header>
        <img src="./assets/logo.svg" alt="logo" />
        <div>
          <button onClick={() => setShowModal(true)}>
            თანამშრომლის შექმნა
          </button>
          <button className="btn-create-task">
            <img src="./assets/add.svg" alt="add icon" />
            შექმენი ახალი დავალება
          </button>
        </div>
      </header>
      {showModal && (
        <AddEmploy departments={departments} setShowModal={setShowModal} />
      )}
    </>
  );
}
