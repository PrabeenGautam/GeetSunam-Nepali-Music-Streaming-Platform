import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";

import UploadDragDrop from "@/pages/upload/UploadDragDrop";
import UploadEditDetails from "@/pages/upload/UploadEditDetails";

import { uploadSongs } from "@/services/musicApi/postSongs.api";

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

  const handleErrorAndUpload = async (files) => {
    if (uploadedFiles) return;

    if (files.length > 1) {
      setError("Only single file is allowed to be uploaded at once.");
      setSongUploaded(false);
      return;
    }

    if (files[0].type !== "audio/mpeg") {
      setError("Only mp3 files are allowed to be uploaded.");
      setSongUploaded(false);
      return;
    }

    setError("");
    setUploadedFiles(files[0]);
    setShowProgress(true);
    setUploadProgress("Uploading Files...");

    const postData = new FormData();
    postData.append("title", files[0].name.replace(".mp3", ""));
    postData.append("source", files[0]);

    const response = await uploadSongs(postData);

    if (response) {
      setShowProgress(false);
      setSongUploaded(true);
      setUploadedSong(response?.data?.song);
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
        onClick={() => setClickUpload(false)}></div>
      <div className="upload-container">
        <div className="header">
          <div className="header-details">
            <h2 className="h2">Upload Songs</h2>
            <div className="flex-center gap-sm">
              {uploadProgress && (
                <span className="saved">{uploadProgress}</span>
              )}
              <MdClose
                style={{ cursor: "pointer", width: 32, height: 32 }}
                onClick={() => setClickUpload(false)}
              />
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
          />
        )}
      </div>
    </div>
  );
}

export default UploadModel;
