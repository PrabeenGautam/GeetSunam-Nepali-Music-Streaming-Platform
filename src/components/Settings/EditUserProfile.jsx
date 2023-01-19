import { useState } from "react";
import { MdClose } from "react-icons/md";
import { createPortal } from "react-dom";

import Placeholder from "@/assets/images/genre/placeholder-image.jpg";

function EditUserModal({ setClick }) {
  const [selectedImage, setSelectedImage] = useState(Placeholder);

  const getBase64 = (file, callback) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      callback(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      getBase64(e.target.files[0], (result) => {
        setSelectedImage(result);
      });
    }
  };
  return (
    <>
      <div className="model">
        <div
          className="model-container"
          onClick={() => {
            setClick(false);
          }}></div>
        <div className="container">
          <div className="header">
            <h2 className="h2">Edit Details</h2>
            <MdClose
              style={{ cursor: "pointer", width: 32, height: 32 }}
              onClick={() => setClick(false)}
            />
          </div>

          <div className="edit-section">
            <form action="">
              <div className="input-field">
                <div className="playlists-image">
                  <img
                    src={selectedImage}
                    alt="playlists"
                    name="playlists-image"
                  />
                  <input
                    type="file"
                    alt=""
                    accept="image/*"
                    name="playlistImage"
                    onChange={imageChange}
                  />
                </div>

                <span className="custom-input">
                  <label htmlFor="username">Username</label>
                  <input type="text" name="username" />

                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" />
                </span>
              </div>

              <button
                type="submit"
                className="btn btn-play"
                style={{ marginTop: 20 }}>
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

function EditUserProfile({ setClick }) {
  return createPortal(
    <EditUserModal setClick={setClick} />,
    document.getElementById("modal")
  );
}

export default EditUserProfile;
