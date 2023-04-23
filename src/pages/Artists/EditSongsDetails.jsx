import Spinner from "@/components/Loader/Spinner";
import { getGenreData } from "@/hooks/useGenresData";
import { getSongsByID } from "@/services/musicApi/getSongs.api";
import { updateSongApi } from "@/services/musicApi/postSongs.api";
import React, { useEffect, useState } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

function EditSongDetails() {
  const { id: songId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [currentSong, setCurrentSong] = useState(location.state);
  const [coverArt, setCoverArt] = useState("");
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const { data: genres, isFetching } = getGenreData();

  const genreSelectOptions =
    !isFetching &&
    genres.map((genre) => ({
      label: genre.name,
      value: genre._id,
    }));

  useEffect(() => {
    async function fetchData() {
      if (currentSong) return;
      const data = await getSongsByID(songId);
      setCurrentSong(data.songs);
    }

    fetchData();
  }, [songId]); //

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
  };

  const inputChange = (e) => {
    if (e.label) {
      setFormData((prev) => ({ ...prev, genre: e.value }));
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData) return;

    const postData = new FormData();
    if (formData.title) postData.append("title", formData.title);
    if (formData.releasedDate)
      postData.append("releasedDate", formData.releasedDate);
    if (coverArt) postData.append("coverArt", coverArt);
    if (formData.genre) {
      postData.append("genre", formData.genre);
    }

    const response = await updateSongApi({ formData: postData, songId });
    if (response.status === "success") {
      navigate("/dashboard");
    }
  };

  return (
    <React.Fragment>
      {currentSong ? (
        <div className="content-container edit-song">
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
                  defaultValue={currentSong.title}
                  onChange={inputChange}
                  maxLength={100}
                />
              </div>

              <div className="input-section">
                <label>Released Date: (Optional)</label>
                <input
                  type="date"
                  className="input-text"
                  name="releasedDate"
                  defaultValue={currentSong.releasedDate}
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
                  maxMenuHeight={180}
                  name="genre"
                  onChange={inputChange}
                  defaultValue={{
                    label: currentSong.genre.name,
                    value: currentSong.genre._id,
                  }}
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
                Select or upload a picture that depict the songs. A good
                thumbnail stands out and draws viewers' attention.
              </div>

              {error && <div className="upload-error">{error}</div>}

              <div className="upload image-upload mt-4">
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
                  {coverArt && (
                    <img src={URL.createObjectURL(coverArt)} alt="coverArt" />
                  )}
                </div>
              </div>
            </div>

            <div className="song-preview">
              <h2>Preview Song</h2>
              <div className="song-preview-details">
                <div className="coverArt">
                  {currentSong.coverArt && (
                    <img src={currentSong.coverArt} alt="image-preview" />
                  )}
                </div>
                <div>
                  <audio controls>
                    <source src={currentSong.source} />
                  </audio>
                </div>
                <div style={{ margin: 10 }}>
                  <div className="song-label">Filename</div>
                  <div className="song-name">{currentSong.title}</div>
                </div>
              </div>

              <button className="btn mt-20">Save</button>
            </div>
          </form>
        </div>
      ) : (
        <Spinner />
      )}
    </React.Fragment>
  );
}

export default EditSongDetails;
