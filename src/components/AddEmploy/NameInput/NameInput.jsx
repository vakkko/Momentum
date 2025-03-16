import ErrorMsgs from "./ErrorMsgs/ErrorMsgs";
import "./nameInput.css";

export default function NameInput({ id, label, handleNameChange, name }) {
  return (
    <div>
      <label htmlFor="name">{label}</label>
      <br />
      <input
        onChange={handleNameChange}
        value={name}
        type="text"
        id={id}
        minLength={2}
        maxLength={255}
        required
      />
      <ErrorMsgs validate={name} msg={"მინიმუმ 2 სიმბოლო"} checkOn={2} />
    </div>
  );
}
