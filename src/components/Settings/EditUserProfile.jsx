import { useState } from "react";
import { MdClose } from "react-icons/md";
import { createPortal } from "react-dom";

import Placeholder from "@/assets/images/genre/placeholder-image.jpg";
import updateUserApi from "@/services/usersApi/updateUser.api";
import { useNavigate } from "react-router-dom";
import useGSDispatch from "@/redux/useGSDispatch";
import { resetLogin } from "@/redux/slices/userSlice";

function EditUserModal({ setClick, profile }) {
  const [selectedImage, setSelectedImage] = useState(Placeholder);
  const [uploadedImage, setUploadedImage] = useState("");
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();
  const dispatch = useGSDispatch();

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
      setUploadedImage(e.target.files[0]);

      getBase64(e.target.files[0], (result) => {
        setSelectedImage(result);
      });
    }
  };

  const handleFormData = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = new FormData();
    if (formData.fullname) postData.append("fullname", formData.fullname);
    if (formData.email) postData.append("email", formData.email);
    if (uploadedImage) postData.append("profileImage", uploadedImage);

    updateUserApi(postData).then(() => {
      setClick(false);

      dispatch(resetLogin());
      navigate("/login");
    });
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
            <form onSubmit={handleSubmit}>
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
                  <label htmlFor="username">Fullname</label>
                  <input
                    type="text"
                    name="fullname"
                    defaultValue={profile.fullname}
                    onChange={handleFormData}
                  />

                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={profile.email}
                    onChange={handleFormData}
                  />
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

function EditUserProfile({ setClick, profile }) {
  return createPortal(
    <EditUserModal setClick={setClick} profile={profile} />,
    document.getElementById("modal")
  );
}

export default EditUserProfile;
