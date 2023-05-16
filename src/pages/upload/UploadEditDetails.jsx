import React, { useRef, useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Select from "react-select";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { useTranslation } from "react-i18next";

import { getGenreData } from "@/hooks/useGenresData";
import { classifySongGenreApi } from "@/services/musicApi/classifySongGenre.api";
import { updateSongApi } from "@/services/musicApi/postSongs.api";
import { SongConfig } from "@/services/api.routes";
import { getToken } from "@/utils/storage.utils";

function UploadEditDetails({
  audioFile,
  isGenreActive,
  uploadedSong,
  setIsEditing,
}) {
  const [error, setError] = useState("");
  const { data: genres, isFetching } = getGenreData();
  const [coverArt, setCoverArt] = useState("");
  const [formData, setFormData] = useState({});
  const [classifiedGenre, setClassifiedGenre] = useState(null);

  const checkboxRef = useRef();
  const queryClient = useQueryClient();

  const { t } = useTranslation("translation", { keyPrefix: "editSong" });

  // const {
  //   mutateAsync: classifyGenre,
  //   data: classifiedGenre,
  //   isLoading: isClassifyGenreLoading,
  // } = useMutation({
  //   mutationFn: () => classifySongGenreApi({ songId: uploadedSong._id }),
  //   onSuccess: (data) => {
  //     console.log({ data }, "genre classified data");
  //   },
  //   onError: (error) => {
  //     console.log({ error }, "error on classifing");
  //   },
  // });

  const {
    mutateAsync: updateSong,
    data: updateSongData,
    isLoading: isUpdatedSongLoading,
  } = useMutation({
    mutationFn: (postData) => updateSongApi(postData),
    onSuccess: (data) => {
      console.log({ data }, "Successfully updated genre");
    },
    onError: (error) => {
      console.log({ error }, "Error on  updated genre");
    },
  });

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

    console.log(files);
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

    const checked = checkboxRef.current.checked;

    const postData = new FormData();

    if (formData.title) postData.append("title", formData.title);

    if (formData.releasedDate)
      postData.append("releasedDate", formData.releasedDate);

    if (coverArt) postData.append("coverArt", coverArt);

    if (formData.genre) {
      postData.append("genre", formData.genre);
    }
    // else {
    //   const classifiedResponse = await classifyGenre();
    // }

    if (uploadedSong.public !== checked) postData.append("public", checked);

    const updatedData = await updateSong({
      formData: postData,
      songId: uploadedSong._id,
    });

    queryClient.invalidateQueries("currentUserSongs");
    setIsEditing(false);
  };

  const eventSourceConfig = {
    headers: new Headers({
      Authorization: `Bearer ${getToken()}`,
    }),
  };

  useEffect(() => {
    if (classifiedGenre) {
      return;
    }

    const eventSource = new EventSource(
      SongConfig.CLASSIFICATION_SSE_STREAM(uploadedSong?._id),
      eventSourceConfig
    );

    eventSource.onopen = () => {
      console.log("Classification SSE connection opened");
    };

    // event.data example
    //     {
    //     "genre": {
    //         "_id": "63b28aa4918fd29e1727e097",
    //         "name": "Rock",
    //         "image": "https://geetsunam.onrender.com/imgs/genres/genres-8-1673367531123.png"
    //     }
    // }
    eventSource.onmessage = (event) => {
      let eventData;
      if (event.data) {
        eventData = JSON.parse(event.data);
        setClassifiedGenre(eventData);
        toast.success(
          "Genre classified success. Please select your respective genre"
        );
        // TODO: set genre in Select component once classified
        eventSource.close();
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <React.Fragment>
      <div className="edit-upload">
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
                maxLength={100}
                onChange={inputChange}
                defaultValue={uploadedSong.title}
              />
            </div>

            <div className="input-section">
              <label>{t("releasedDate")}</label>
              <input
                type="date"
                className="input-text"
                name="releasedDate"
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
                isDisabled={!Boolean(isGenreActive)}
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
            {classifiedGenre && (
              <p className="mt-10 song-info" style={{ color: "#22c252" }}>
                {" "}
                We have automatically recommended the song's genre. Please
                re-select if you think the song belongs to other genre.
              </p>
            )}

            <div className="mt-20 mb-10">{t("coverArt")}</div>
            <div className="song-info">{t("coverArtDesc")}</div>

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
                <p>{t("browse")}</p>
              </label>

              <div className="file-preview mt-20">
                {coverArt && <img src={getURL(coverArt)} alt="coverArt" />}
              </div>
            </div>
          </div>

          <div className="song-preview">
            <h2>{t("preview")}</h2>
            <div className="song-preview-details">
              <div className="coverArt">
                {uploadedSong.coverArt && (
                  <img src={uploadedSong.coverArt} alt="image-preview" />
                )}
              </div>
              <div>
                <audio controls>
                  <source src={getURL(audioFile)} />
                </audio>
              </div>
              <div style={{ margin: 10 }}>
                <div className="song-label">{t("filename")}</div>
                <div className="song-name">{`${audioFile.name}`}</div>
              </div>
            </div>
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                margin: "15px 0 0",
              }}
            >
              <label htmlFor="checkbox" style={{ marginRight: 10 }}>
                {t("makePublic")}:{" "}
              </label>
              <input
                type="checkbox"
                name="public"
                id="checkbox"
                ref={checkboxRef}
                defaultChecked={uploadedSong.public}
                style={{ height: 20, width: 20 }}
              />
            </div>
            <button className="btn mt-20">{t("save")}</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default UploadEditDetails;
