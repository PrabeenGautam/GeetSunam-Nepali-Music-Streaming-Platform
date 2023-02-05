import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";
import UploadDragDrop from "@/pages/upload/UploadDragDrop";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import UploadEditDetails from "@/pages/upload/UploadEditDetails";

function UploadModel() {
  return createPortal(<UploadModelOverlay />, document.getElementById("modal"));
}

function UploadModelOverlay() {
  const [songUploaded, setSongUploaded] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState("");
  const [genre, setGenre] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(
    "Getting Genre of Songs"
  );

  const [error, setError] = useState("");
  const logoUploadRef = useRef();

  const handleErrorAndUpload = (files) => {
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

    logoUploadRef.current.classList.add("animate");
    setError("");
    setUploadedFiles(files[0]);

    // Show Initial Animatio and then show Song Details
    setTimeout(() => {
      setSongUploaded(true);
      setShowProgress(true);
    }, 1500);

    console.log(files);
  };

  useEffect(() => {
    if (songUploaded) {
      const timer = setInterval(() => {
        setGenre(true);
        setUploadProgress("Saved as Private");
        setShowProgress(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [songUploaded]);

  return (
    <div className="model">
      <div className="model-container"></div>
      <div className="upload-container">
        <div className="header">
          <div className="header-details">
            <h2 className="h2">Upload Songs</h2>
            <div className="flex-center gap-sm">
              {songUploaded && <span className="saved">{uploadProgress}</span>}
              <MdClose style={{ cursor: "pointer", width: 32, height: 32 }} />
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
          <UploadEditDetails audioFile={uploadedFiles} genre={genre} />
        )}
      </div>
    </div>
  );
}

export default UploadModel;
