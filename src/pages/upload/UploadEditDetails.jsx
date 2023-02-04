import { TextField } from "@mui/material";
import React, { useState } from "react";
import Select from "react-select";

import placeholder from "@/assets/images/songs/default-temp.png";
import { getGenreData } from "@/hooks/useGenresData";

function UploadEditDetails({ audioFile }) {
  // const audioURL = URL.createObjectURL(audioFile);

  const { data: genres, isFetching } = getGenreData();

  const genreSelectOptions =
    !isFetching &&
    genres.map((genre) => ({
      label: genre.name,
      value: genre._id,
    }));

  return (
    <React.Fragment>
      <div className="grid edit-upload gap-m child-scroll">
        <div className="song-details">
          <h2>Details</h2>
          <form>
            <div className="input-section">
              <label>Song Title: (required)</label>
              <input
                type="text"
                placeholder="Enter Songs title"
                className="input-text"
                name="title"
                maxLength={100}
              />
            </div>

            <div className="input-section">
              <label>Released Date: (Optional)</label>
              <input type="date" className="input-text" name="releasedDate" />
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
                maxMenuHeight={180}
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
          </form>
        </div>
        <div className="song-preview">
          <h2>Preview Song</h2>
          <div className="song-preview-details">
            <div className="coverArt">
              <img src={placeholder} alt="image-preview" />
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
        </div>
      </div>
    </React.Fragment>
  );
}

export default UploadEditDetails;
