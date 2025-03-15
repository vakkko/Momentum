import { useContext, useEffect } from "react";
import "./filterSection.css";
import axios from "axios";
import { useState } from "react";
import FilterOptions from "./FilterOptions/FilterOptions";
import { DepContext } from "../../context/context";

export default function FilterSection({ departments }) {
  const [showDepartments, setShowDepartments] = useState(false);
  const [priorities, setPriorities] = useState([]);
  const [showPriorities, setShowPriorities] = useState(false);
  const [showEmployees, setShowEmployess] = useState(false);
  const contextData = useContext(DepContext);
  const employees = contextData.employees;

  useEffect(() => {
    axios
      .get("https://momentum.redberryinternship.ge/api/priorities")
      .then((res) => setPriorities(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDepClick = () => {
    setShowDepartments(!showDepartments);
    setShowPriorities(false);
    setShowEmployess(false);
  };

  const handlePriorClick = () => {
    setShowDepartments(false);
    setShowEmployess(false);
    setShowPriorities(!showPriorities);
  };

  const handleEmplClick = () => {
    setShowEmployess(!showEmployees);
    setShowDepartments(false);
    setShowPriorities(false);
  };

  return (
    <div className="filter-section">
      <h1>დავალებების გვერდი</h1>
      <div className="filter-options">
        <button onClick={handleDepClick}>
          დეპარტამენტი
          <svg
            fill="#8338EC"
            height="8px"
            width="14px"
            version="1.1"
            id="Layer_1"
            viewBox="0 0 330 330"
          >
            <path
              id="XMLID_225_"
              d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	              c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
            />
          </svg>
        </button>
        <button onClick={handlePriorClick}>
          პრიორიტეტი
          <img src="./assets/down-arrow.svg" alt="down-arrow-icon" />
        </button>
        <button onClick={handleEmplClick}>
          თანამშრომელი
          <img src="./assets/down-arrow.svg" alt="down-arrow-icon" />
        </button>
      </div>
      {showDepartments && <FilterOptions options={departments} dep={true} />}
      {showPriorities && <FilterOptions options={priorities} />}
      {showEmployees && <FilterOptions options={employees} />}
    </div>
  );
}
