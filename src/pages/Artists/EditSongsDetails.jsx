import React, { useEffect, useState } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

import Spinner from "@/components/Loader/Spinner";
import { getGenreData } from "@/hooks/useGenresData";
import { getSongsByID } from "@/services/musicApi/getSongs.api";
import { updateSongApi } from "@/services/musicApi/postSongs.api";
import { useTranslation } from "react-i18next";

function EditSongDetails() {
  const { id: songId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation("translation", { keyPrefix: "editSong" });

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
      setError(t("singleFile"));
      setCoverArt("");
      return;
    }

    if (!files[0].type.includes("image")) {
      setError(t("mp3File"));
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
              <h2>{t("details")}</h2>

              <div className="input-section">
                <label>{t("songTitle")}</label>
                <input
                  type="text"
                  placeholder={t("songPlaceholder")}
                  className="input-text"
                  name="title"
                  defaultValue={currentSong.title}
                  onChange={inputChange}
                  maxLength={100}
                />
              </div>

              <div className="input-section">
                <label>{t("releasedDate")}</label>
                <input
                  type="date"
                  className="input-text"
                  name="releasedDate"
                  defaultValue={currentSong.releasedDate}
                  onChange={inputChange}
                />
              </div>

              <div className="mt-20 mb-10">{t("genre")}</div>
              <div className="song-info">{t("genreDescription")}</div>

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

              <div className="mt-20 mb-10">{t("coverArt")}</div>
              <div className="song-info">{t("coverArtDesc")}</div>

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
                  <p>{t("browse")}</p>
                </label>

                <div className="file-preview mt-20">
                  {coverArt && (
                    <img src={URL.createObjectURL(coverArt)} alt="coverArt" />
                  )}
                </div>
              </div>
            </div>

            <div className="song-preview">
              <h2>{t("preview")}</h2>
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
                  <div className="song-label">{t("filename")}</div>
                  <div className="song-name">{currentSong.title}</div>
                </div>
              </div>

              <button className="btn mt-20">{t("save")}</button>
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
