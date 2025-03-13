import { useState } from "react";
import "./addEmploy.css";

export default function AddEmploy({ setShowModal, departments }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];

      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  const closeModal = () => {
    setShowModal(false);
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
          <div>
            <label htmlFor="name">სახელი*</label>
            <br />
            <input type="text" id="name" />
          </div>
          <div>
            <label htmlFor="surname">გვარი*</label>
            <br />
            <input type="text" id="surname" />
          </div>
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
            <select id="department">
              <option disabled selected hidden value=""></option>
              {departments.map((opt) => (
                <option key={opt.id} value={opt.name}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="modal-button-group">
          <button onClick={closeModal}>გაუქმება</button>
          <button className="btn-add">დაამატე თანამშრომელი</button>
        </div>
      </div>
    </div>
  );
}
