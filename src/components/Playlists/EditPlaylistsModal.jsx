import { useState } from "react";
import { MdClose } from "react-icons/md";
import { createPortal } from "react-dom";

import Placeholder from "@/assets/images/genre/placeholder-image.jpg";
import { Btn } from "../StyledUI";
import { updatePlaylistAPI } from "@/services/playlistApi/getPlaylist.api";
import useGSSelector from "@/redux/useGSSelector";
import useGSDispatch from "@/redux/useGSDispatch";
import { getPlaylistByIDThunk } from "@/redux/middlewares/playlistThunk";

function EditPlaylistsModelOverlay({ setClick }) {
  const [selectedImage, setSelectedImage] = useState(Placeholder);
  const [uploadedImage, setUploadedImage] = useState("");
  const dispatch = useGSDispatch();

  const [formData, setFormData] = useState({});
  const id = useGSSelector((state) => state.playlistState.playlistByID._id);

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
    if (formData.title) postData.append("title", formData.title);
    if (formData.description)
      postData.append("description", formData.description);
    if (uploadedImage) postData.append("coverArt", uploadedImage);

    updatePlaylistAPI(postData, id).then(() => {
      setClick(false);
      dispatch(getPlaylistByIDThunk(id));
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
        <div className="container" style={{ zIndex: 9999 }}>
          <div className="header">
            <h2 className="h2">Edit Details</h2>
            <MdClose
              style={{ cursor: "pointer", width: 32, height: 32 }}
              onClick={() => setClick(false)}
            />
          </div>
          <div className="edit-section">
            <form onSubmit={handleSubmit}>
              <div className="input-field ">
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

                <div className="form">
                  <input
                    type="text"
                    name="title"
                    id="playlist-name"
                    placeholder="Enter a name"
                    onChange={handleFormData}
                  />
                  <textarea
                    name="description"
                    id="playlist-description"
                    onChange={handleFormData}
                    placeholder="Enter Description (Optional)"></textarea>
                </div>
              </div>
              <Btn className="btn-play save-playlist">Save</Btn>
            </form>
          </div>
          <div className="guildlines">
            Please ensure that you have uploaded the correct images and make
            sure you have the right to upload the image.
          </div>
        </div>
      </div>
    </>
  );
}

function EditPlaylistsModel({ setClick }) {
  return createPortal(
    <EditPlaylistsModelOverlay setClick={setClick} />,
    document.getElementById("modal")
  );
}

export default EditPlaylistsModel;
