import "./errorMsgs.css";

export default function ErrorMsgs({ validate, msg, checkOn }) {
  return (
    <div className="error-container">
      <div>
        <svg
          width="14"
          height="10"
          viewBox="0 0 14 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${
            validate.length < checkOn && validate.length > 0
              ? "not-validate"
              : validate.length >= checkOn
              ? "validate"
              : ""
          }`}
        >
          <path
            d="M12.3327 1L4.99935 8.33333L1.66602 5"
            stroke="#6C757D"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p
          className={`${
            validate.length < checkOn && validate.length > 0
              ? "not-validate"
              : validate.length >= checkOn
              ? "validate"
              : ""
          }`}
        >
          {msg}
        </p>
      </div>
      <div>
        <svg
          width="14"
          height="10"
          viewBox="0 0 14 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${
            validate.length === 0
              ? ""
              : validate.length > 0 && validate.length < 255
              ? "validate"
              : "not-validate"
          }`}
        >
          <path
            d="M12.3327 1L4.99935 8.33333L1.66602 5"
            stroke="#6C757D"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p
          className={`${
            validate.length === 0
              ? ""
              : validate.length > 0 && validate.length < 255
              ? "validate"
              : "not-validate"
          }`}
        >
          მაქსიმუმ 255 სიმბოლო
        </p>
      </div>
    </div>
  );
}
