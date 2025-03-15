import "./department.css";

export default function Department({
  selectedDepartment,
  handleSelectedDep,
  departments,
  taskPage,
}) {
  return (
    <div className={`select-department ${taskPage && "taskpage-dep"}`}>
      <label>დეპარტამენტი*</label>
      <br />
      <select
        id="department"
        value={selectedDepartment}
        onChange={handleSelectedDep}
        required
      >
        <option disabled hidden value=""></option>
        {departments.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
}
