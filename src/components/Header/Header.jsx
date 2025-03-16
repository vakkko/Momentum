import { useState } from "react";
import "./header.css";
import AddEmploy from "../AddEmploy/AddEmploy";
import { createPortal } from "react-dom";
import { Link } from "react-router";

export default function Header({ departments }) {
  const [showModal, setShowModal] = useState(false);
  const root = document.getElementById("root");

  const handleAddEmployClick = () => {
    setShowModal(true);
    root.classList.add("blur");
  };

  return (
    <>
      <header>
        <Link to={"/"}>
          <img src="./assets/logo.svg" alt="logo" />
        </Link>
        <div>
          <button onClick={handleAddEmployClick}>თანამშრომლის შექმნა</button>
          <button className="btn-create-task">
            <Link to={"add-task"}>
              <img src="./assets/add.svg" alt="add icon" />
              შექმენი ახალი დავალება
            </Link>
          </button>
        </div>
      </header>
      {showModal &&
        createPortal(
          <AddEmploy setShowModal={setShowModal} departments={departments} />,
          document.body
        )}
    </>
  );
}
