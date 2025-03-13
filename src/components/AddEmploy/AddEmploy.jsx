import { useState } from "react";
import "./addEmploy.css";
import NameInput from "./NameInput/NameInput";
import axios from "axios";

export default function AddEmploy({ setShowModal, departments }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const root = document.getElementById("root");

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    root.classList.remove("blur");
  };

  const handleNameChange = (e) => {
    const regex = /^[a-zA-Zა-ჰ]+$/;
    const inputValue = e.target.value;

    if (regex.test(inputValue) || inputValue === "") {
      setName(inputValue);
    }
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handleSelectedDep = (e) => {
    setSelectedDepartment(e.target.value);
  };
  const handleSubmit = async () => {
    if (
      name.length >= 2 &&
      name.length <= 255 &&
      surname.length >= 2 &&
      surname.length <= 255 &&
      selectedDepartment &&
      file
    ) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("surname", surname);
      formData.append("avatar", file);
      formData.append("department_id", selectedDepartment);

      try {
        await axios.post(
          "https://momentum.redberryinternship.ge/api/employees",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer 9e6c1b92-a397-450d-8338-35b007457477`,
            },
          }
        );
        closeModal();
      } catch (error) {
        console.error(error);
      }
    }
    return;
  };

  return (
    <div className="modal">
      <div onClick={closeModal} className="overlay"></div>
      <div className="modal-content">
        <button className="btn-close" onClick={closeModal}>
          <img src="./assets/close.svg" alt="close" />
        </button>
        <h2>თანამშრომლის დამატება</h2>
        <div className="employ-inputs">
          <NameInput
            label={"სახელი*"}
            id={"name"}
            name={name}
            handleNameChange={handleNameChange}
          />
          <NameInput
            label={"გვარი*"}
            id={"surname"}
            name={surname}
            handleNameChange={handleSurnameChange}
          />
          <div className="avatar-container">
            <span>ავატარი*</span>
            <div>
              {!preview ? (
                <>
                  <label id="avatar-label" htmlFor="avatar">
                    ატვირთე ფოტო
                    <br />
                    <img
                      className="avatar-upload"
                      src="./assets/gallery-export.svg"
                      alt="gallery icon"
                    />
                  </label>
                  <input
                    onChange={handleFileChange}
                    size={600000}
                    type="file"
                    id="avatar"
                    placeholder="ატვირთე"
                  />
                </>
              ) : (
                <div className="avatar-img-container">
                  <img
                    className="img-avatar"
                    src={preview}
                    alt="Preview"
                    width={200}
                  />
                  <img
                    onClick={() => setPreview("")}
                    className="delete-icon"
                    src="./assets/delete-icon.svg"
                    alt="delete icon"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="select-department">
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
        </div>
        <div className="modal-button-group">
          <button onClick={closeModal}>გაუქმება</button>
          <button onClick={handleSubmit} className="btn-add">
            დაამატე თანამშრომელი
          </button>
        </div>
      </div>
    </div>
  );
}
