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
      <div
        className={`error-container ${
          name.length <= 2
            ? "not-validate"
            : name.length > 2 && name.length < 255 && "validate"
        }`}
      >
        <p>
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.3327 1L4.99935 8.33333L1.66602 5"
              stroke="#6C757D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          მინიმუმ 2 სიმობოლო
        </p>
        <p>
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.3327 1L4.99935 8.33333L1.66602 5"
              stroke="#6C757D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          მაქსიმუმ 255 სიმბოლო
        </p>
      </div>
    </div>
  );
}
