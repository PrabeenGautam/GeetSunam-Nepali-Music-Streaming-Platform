import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";

import UploadDragDrop from "@/pages/upload/UploadDragDrop";
import UploadEditDetails from "@/pages/upload/UploadEditDetails";

import { uploadSongs } from "@/services/musicApi/postSongs.api";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

function UploadModel({ setClickUpload }) {
  return createPortal(
    <UploadModelOverlay setClickUpload={setClickUpload} />,
    document.getElementById("modal")
  );
}

function UploadModelOverlay({ setClickUpload }) {
  const [songUploaded, setSongUploaded] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState("");
  const [genre, setGenre] = useState(null);
  const [uploadProgress, setUploadProgress] = useState("");
  const [uploadedSong, setUploadedSong] = useState("");

  const [error, setError] = useState("");
  const logoUploadRef = useRef();
  const { t } = useTranslation("translation", { keyPrefix: "upload" });
  const queryClient = useQueryClient();

  const handleErrorAndUpload = async (files) => {
    if (uploadedFiles) return;

    if (files.length > 1) {
      setError(t("singleFile"));
      setSongUploaded(false);
      return;
    }

    if (files[0].type !== "audio/mpeg") {
      setError(t("mp3File"));
      setSongUploaded(false);
      return;
    }

    setError("");
    setUploadedFiles(files[0]);
    setShowProgress(true);
    setUploadProgress(t("uploading"));

    const postData = new FormData();
    postData.append("title", files[0].name.replace(".mp3", ""));
    postData.append("source", files[0]);

    const response = await uploadSongs(postData);

    if (response) {
      setShowProgress(false);
      setSongUploaded(true);
      setUploadedSong(response?.data?.song);
      setIsEditing(true);
      queryClient.invalidateQueries("currentUserSongs");
    }
  };

  useEffect(() => {
    if (songUploaded) {
      setGenre(true);
      setUploadProgress("Saved as Private");
      setShowProgress(false);
    }
  }, [songUploaded]);

  return (
    <div className="model">
      <div
        className="model-container"
        onClick={() => !songUploaded && setClickUpload(false)}></div>
      <div className="upload-container">
        <div className="header">
          <div className="header-details">
            <h2 className="h2">{t("uploadSong")}</h2>
            <div className="flex-center gap-sm">
              {uploadProgress && (
                <span className="saved">{uploadProgress}</span>
              )}
              {!songUploaded && (
                <MdClose
                  style={{ cursor: "pointer", width: 32, height: 32 }}
                  onClick={() => setClickUpload(false)}
                />
              )}
            </div>
          </div>

          {showProgress && (
            <div className="upload-progress ">
              <div></div>
            </div>
          )}
        </div>

        {!songUploaded && (
          <UploadDragDrop
            logoUploadRef={logoUploadRef}
            error={error}
            handleErrorAndUpload={handleErrorAndUpload}
          />
        )}

        {songUploaded && (
          <UploadEditDetails
            audioFile={uploadedFiles}
            genre={genre}
            uploadedSong={uploadedSong}
            setIsEditing={setClickUpload}
          />
        )}
      </div>
    </div>
  );
}

export default UploadModel;
