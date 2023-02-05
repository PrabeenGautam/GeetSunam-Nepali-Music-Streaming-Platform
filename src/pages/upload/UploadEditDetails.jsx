import React, { useState } from "react";
import Select from "react-select";

import placeholder from "@/assets/images/songs/default-temp.png";
import { getGenreData } from "@/hooks/useGenresData";
import { AiOutlineCloudDownload } from "react-icons/ai";

function UploadEditDetails({ audioFile, genre }) {
  const [error, setError] = useState("");
  const { data: genres, isFetching } = getGenreData();
  const [coverArt, setCoverArt] = useState("");

  const [formData, setFormData] = useState({});

  const getURL = (file) => {
    if (file) {
      return URL.createObjectURL(file);
    }
  };

  const genreSelectOptions =
    !isFetching &&
    genres.map((genre) => ({
      label: genre.name,
      value: genre._id,
    }));

  const fileUploadChange = (e) => {
    const files = e.target.files;
    if (files.length > 1) {
      setError("Only single file is allowed to be uploaded at once.");
      setCoverArt("");
      return;
    }

    if (!files[0].type.includes("image")) {
      setError("Only images are allowed to be uploaded.");
      setCoverArt("");
      return;
    }

    setError("");
    setCoverArt(files[0]);

    console.log(files);
  };

  const inputChange = (e) => {
    if (e.label) {
      setFormData((prev) => ({ ...prev, genre: e.value }));
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = new FormData();
    if (formData.title) postData.append("title", formData.title);
    if (formData.releasedDate)
      postData.append("releaseDate", formData.releasedDate);
    if (formData.genre) postData.append("genre", formData.genre);
    if (coverArt) postData.append("coverArt", coverArt);

    for (let i of postData) {
      console.log(i);
    }
  };

  return (
    <React.Fragment>
      <div className="edit-upload">
        <form className="grid gap-m" onSubmit={handleSubmit}>
          <div className="song-details">
            <h2>Details</h2>

            <div className="input-section">
              <label>Song Title: (required)</label>
              <input
                type="text"
                placeholder="Enter Songs title"
                className="input-text"
                name="title"
                maxLength={100}
                onChange={inputChange}
              />
            </div>

            <div className="input-section">
              <label>Released Date: (Optional)</label>
              <input
                type="date"
                className="input-text"
                name="releasedDate"
                onChange={inputChange}
              />
            </div>

            <div className="mt-20 mb-10">Genres</div>

            <div className="song-info">
              Add Genres for Your Songs. Its default value is classified by
              system machine learning models, and you can then change genre
              later at any time.
            </div>

            <div className="input-section" style={{ width: "20rem" }}>
              <Select
                className="react-select-container"
                classNamePrefix="react-select"
                options={genreSelectOptions}
                isDisabled={!Boolean(genre)}
                maxMenuHeight={180}
                onChange={inputChange}
                name="genre"
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({
                    ...base,
                    zIndex: 10002,
                  }),
                  control: (base) => ({
                    ...base,
                    backgroundColor: "inherit",
                    border: 0,
                    boxShadow: "none",
                    cursor: "pointer",
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#333",
                    color: "white",
                    fontFamily: "Roboto, sans-serif",
                  }),
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: "#222",
                    primary: "#111",
                  },
                })}
              />
            </div>

            <div className="mt-20 mb-10">CoverArt</div>

            <div className="song-info">
              Select or upload a picture that depict the songs. A good thumbnail
              stands out and draws viewers' attention.
            </div>

            {error && <div className="upload-error">{error}</div>}

            <div className="upload image-upload mt-20">
              <label htmlFor="coverArt" className="uploader flex-center">
                <input
                  className="file-input"
                  type="file"
                  id="coverArt"
                  accept="image/*"
                  name="coverArt"
                  hidden
                  onChange={fileUploadChange}
                />
                <AiOutlineCloudDownload />
                <p>Browse File to Upload</p>
              </label>

              <div className="file-preview mt-20">
                {coverArt && <img src={getURL(coverArt)} alt="coverArt" />}
              </div>
            </div>
          </div>

          <div className="song-preview">
            <h2>Preview Song</h2>
            <div className="song-preview-details">
              <div className="coverArt">
                {coverArt && <img src={placeholder} alt="image-preview" />}
              </div>
              <div>
                <audio controls>
                  <source src="http://127.0.0.1:8000/api/songs/stream/63ca757360f30078fcaa4874" />
                </audio>
              </div>
              <div style={{ margin: 10 }}>
                <div className="song-label">Filename</div>
                <div className="song-name">Konichiwas.mp3</div>
              </div>
            </div>

            <button className="btn mt-20">Save</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default UploadEditDetails;
