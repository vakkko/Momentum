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
    prior: {},
    empl: {},
  });

  const [chosenDep, setChosenDep] = useState([]);
  const [chosenPrior, setChosenPrior] = useState([]);
  const [chosenEmpl, setChosenEmpl] = useState([]);
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

  const [filterTriggered, setFilterTriggered] = useState(false);

  const handleFilter = () => {
    setFilterTriggered(true);
  };

  useEffect(() => {
    if (!filterTriggered) return;

    const hasDepartmentFilter = Object.keys(selectedOptions.dep).some(
      (key) => selectedOptions.dep[key]
    );
    const hasPriorityFilter = Object.keys(selectedOptions.prior).some(
      (key) => selectedOptions.prior[key]
    );
    const hasEmplFilter = Object.keys(selectedOptions.empl).some(
      (key) => selectedOptions.empl[key]
    );

    const filtered = allTasks.filter((task) => {
      const matchesDepartment = hasDepartmentFilter
        ? selectedOptions.dep[task.department.id] ?? false
        : true;

      const matchesPriority = hasPriorityFilter
        ? selectedOptions.prior[task.priority.id] ?? false
        : true;

      const matchesEmpl = hasEmplFilter
        ? selectedOptions.empl[task.employee.id] ?? false
        : true;

      return matchesDepartment && matchesPriority && matchesEmpl;
    });

    setFilteredTasks(filtered);
    setShowDepartments(false);
    setShowEmployess(false);
    setShowPriorities(false);

    setChosenDep(
      hasDepartmentFilter
        ? departments
            .filter((dep) => selectedOptions.dep[dep.id])
            .map((dep) => ({ ...dep, category: "dep" }))
        : []
    );

    setChosenPrior(
      hasPriorityFilter
        ? priorities
            .filter((prior) => selectedOptions.prior[prior.id])
            .map((prior) => ({ ...prior, category: "prior" }))
        : []
    );

    setChosenEmpl(
      hasEmplFilter
        ? employees
            .filter((empl) => selectedOptions.empl[empl.id])
            .map((empl) => ({ ...empl, category: "empl" }))
        : []
    );

    setFilterTriggered(false);
  }, [filterTriggered]);

  const handleChange = (category, id) => {
    setSelectedOptions((prev) => {
      return {
        ...prev,
        [category]: {
          ...prev[category],
          [id]: !prev[category][id],
        },
      };
    });
  };

  const handleClearFilters = () => {
    setSelectedOptions({
      dep: {},
      prior: {},
      empl: {},
    });
    setChosenDep([]);
    setChosenPrior([]);
    setChosenEmpl([]);
    setFilteredTasks(allTasks);
  };

  const handleRemove = (category, id) => {
    if (category === "dep") {
      setChosenDep((prev) => prev.filter((option) => option.id !== id));
    } else if (category === "prior") {
      setChosenPrior((prev) => prev.filter((option) => option.id !== id));
    } else if (category === "empl") {
      setChosenEmpl((prev) => prev.filter((option) => option.id !== id));
    }
    setSelectedOptions((prev) => {
      const updatedCategory = { ...prev[category] };
      delete updatedCategory[id];
      return { ...prev, [category]: updatedCategory };
    });

    handleFilter();
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
          selectedOptions={selectedOptions.prior}
          handleChange={(id) => handleChange("prior", id)}
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
      {(chosenEmpl.length > 0 ||
        chosenDep.length > 0 ||
        chosenPrior.length > 0) && (
        <div className="filter-parameters">
          {chosenDep && (
            <ChosenOptions
              chosenOption={chosenDep}
              setChosenOption={setChosenDep}
              handleRemove={handleRemove}
            />
          )}
          {chosenPrior && (
            <ChosenOptions
              chosenOption={chosenPrior}
              setChosenOption={setChosenPrior}
              handleRemove={handleRemove}
            />
          )}
          {chosenEmpl && (
            <ChosenOptions
              chosenOption={chosenEmpl}
              setChosenOption={setChosenEmpl}
              handleRemove={handleRemove}
            />
          )}
          <button onClick={handleClearFilters}>გასუფთავება</button>
        </div>
      )}
    </div>
  );
}
