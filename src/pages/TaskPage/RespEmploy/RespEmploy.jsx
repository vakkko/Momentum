import "./respEmploy.css";
import { useContext, useEffect, useState } from "react";
import { DepContext } from "../../../context/context";
import { createPortal } from "react-dom";
import AddEmploy from "../../../components/AddEmploy/AddEmploy";

export default function RespEmploy({ selectDepartment }) {
  const [filteredEmploy, setFilteredEmploy] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [respEmpl, setRespEmpl] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const contextData = useContext(DepContext);
  const employees = contextData.employees;
  const departments = contextData.departments;

  const root = document.getElementById("root");

  useEffect(() => {
    const filteredList = employees.filter((employ) => {
      if (Number(employ.department.id) === Number(selectDepartment)) {
        return employ;
      }
    });
    setFilteredEmploy(filteredList);
  }, [selectDepartment, employees]);

  const handleClick = () => {
    setShowModal(true);
    root.classList.add("blur");
  };

  return (
    <>
      <div>
        <label htmlFor="resp-employ">პასუხისმგებელი თანამშრომელი</label>
        <br />
        <div onClick={() => setIsOpen(!isOpen)} className="resp-empl-container">
          {respEmpl && (
            <div className="chosen-empl" key={respEmpl.id}>
              <img
                className="employ-avatar"
                src={respEmpl.avatar}
                alt={respEmpl.name}
              />
              <span>{`${respEmpl.name} ${respEmpl.surname}`}</span>
            </div>
          )}
          {isOpen && (
            <div className="empl-list">
              <button onClick={handleClick}>
                <img src="./assets/add-icon.svg" alt="add icon" />
                დაამატე თანამშრომელი
              </button>

              {filteredEmploy.map((employ) => (
                <div onClick={() => setRespEmpl(employ)} key={employ.id}>
                  <img
                    className="employ-avatar"
                    src={employ.avatar}
                    alt={employ.name}
                  />
                  <span>{`${employ.name} ${employ.surname}`}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {selectDepartment && (
          <div className="err-container">
            <p className={`${respEmpl ? "validate" : "not-validate"}`}>
              აირჩიეთ თანამშრომელი
            </p>
          </div>
        )}
      </div>
      {showModal &&
        createPortal(
          <AddEmploy setShowModal={setShowModal} departments={departments} />,
          document.body
        )}
    </>
  );
}
