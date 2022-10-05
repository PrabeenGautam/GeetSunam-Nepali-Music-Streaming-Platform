import React from "react";
import * as Icons from "react-icons/gi";
import Placeholder from "assets/images/genre/placeholder-image.jpg";
import { Btn } from "../StyledUI";
import { useState } from "react";
import { useEffect } from "react";

function EditPlaylistsModel({ setClick }) {
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
      <div className="model-container">
        <div className="container">
          <div className="header">
            <h2>Edit Details</h2>
            <Icons.GiTireIronCross
              style={{ cursor: "pointer" }}
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

                <div className="form">
                  <input
                    type="text"
                    name="playlistName"
                    id="playlist-name"
                    placeholder="Enter a name"
                  />
                  <textarea
                    name="playlistDescription"
                    id="playlist-description"
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

export default EditPlaylistsModel;