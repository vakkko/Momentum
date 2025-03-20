import { useContext, useEffect } from "react";
import "./filterSection.css";
import axios from "axios";
import { useState } from "react";
import FilterOptions from "./FilterOptions/FilterOptions";
import { DepContext } from "../../../context/context";
import ChosenOptions from "./ChosenOptions/ChosenOptions";

export default function FilterSection({
  departments,
  allTasks,
  setFilteredTasks,
}) {
  const [showDepartments, setShowDepartments] = useState(false);
  const [priorities, setPriorities] = useState([]);
  const [showPriorities, setShowPriorities] = useState(false);
  const [showEmployees, setShowEmployess] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    dep: {},
    level: {},
    empl: {},
  });
  const [chosenOptions, setChosenOptions] = useState([]);
  const [render, setRender] = useState();
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

  const handleFilter = () => {
    const hasDepartmentFilter = Object.values(selectedOptions.dep).some(
      Boolean
    );

    const hasPriorityFilter = Object.values(selectedOptions.level).some(
      Boolean
    );

    const hasEmplFilter = Object.values(selectedOptions.empl).some(Boolean);

    const filtered = allTasks.filter((task) => {
      const matchesDepartment = Object.keys(selectedOptions.dep).some(
        (key) => selectedOptions.dep[key] && task.department.id === Number(key)
      );

      const matchesPriority = Object.keys(selectedOptions.level).some(
        (key) => selectedOptions.level[key] && task.priority.id === Number(key)
      );

      const mathcesEmpl = Object.keys(selectedOptions.empl).some(
        (key) => selectedOptions.empl[key] && task.employee.id === Number(key)
      );

      if (hasDepartmentFilter && hasPriorityFilter && hasEmplFilter) {
        return matchesDepartment && matchesPriority && mathcesEmpl;
      } else if (hasDepartmentFilter && hasPriorityFilter) {
        return matchesDepartment && matchesPriority;
      } else if (hasDepartmentFilter && hasEmplFilter) {
        return matchesDepartment && mathcesEmpl;
      } else if (hasPriorityFilter && hasEmplFilter) {
        return matchesPriority && mathcesEmpl;
      } else if (hasDepartmentFilter) {
        return matchesDepartment;
      } else if (hasPriorityFilter) {
        return matchesPriority;
      } else if (hasEmplFilter) {
        return mathcesEmpl;
      }

      return true;
    });
    setShowDepartments(false);
    setShowEmployess(false);
    setShowPriorities(false);
    setFilteredTasks(filtered);

    let newChosenArray = [];

    if (Object.values(selectedOptions.dep).length > 0) {
      newChosenArray = newChosenArray.concat(
        departments
          .filter((department) => selectedOptions.dep[department.id])
          .map((dep) => ({ ...dep, category: "dep" }))
      );
    }

    if (Object.values(selectedOptions.level).length > 0) {
      newChosenArray = newChosenArray.concat(
        priorities
          .filter((prior) => selectedOptions.level[prior.id])
          .map((prior) => ({ ...prior, category: "level" }))
      );
    }

    if (Object.values(selectedOptions.empl).length > 0) {
      newChosenArray = newChosenArray.concat(
        employees
          .filter((employ) => selectedOptions.empl[employ.id])
          .map((empl) => ({ ...empl, category: "empl" }))
      );
    }

    setChosenOptions(newChosenArray);
  };

  const handleChange = (category, id) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [id]: !prev[category][id],
      },
    }));
  };

  const handleRemove = (category, id) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [id]: false,
      },
    }));

    setChosenOptions((prev) =>
      prev.filter((option) => option.id !== id || option.category !== category)
    );
    setRender((prev) => prev + 1);
  };

  useEffect(() => {
    handleFilter();
  }, [render]);

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
      {showDepartments && (
        <FilterOptions
          selectedOptions={selectedOptions.dep}
          handleChange={(id) => handleChange("dep", id)}
          options={departments}
          dep={true}
          handleFilter={handleFilter}
        />
      )}
      {showPriorities && (
        <FilterOptions
          selectedOptions={selectedOptions.level}
          handleChange={(id) => handleChange("level", id)}
          options={priorities}
          handleFilter={handleFilter}
        />
      )}
      {showEmployees && (
        <FilterOptions
          selectedOptions={selectedOptions.empl}
          handleChange={(id) => handleChange("empl", id)}
          options={employees}
          handleFilter={handleFilter}
        />
      )}

      <ChosenOptions
        setChosenOptions={setChosenOptions}
        chosenOptions={chosenOptions}
        handleRemove={handleRemove}
      />
    </div>
  );
}
