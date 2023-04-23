import React from "react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdUpload } from "react-icons/md";

function UploadDragDrop({ handleErrorAndUpload, logoUploadRef, error }) {
  const inputRef = useRef();
  const { t } = useTranslation("translation", { keyPrefix: "upload" });

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleAudioSelect = (event) => {
    handleErrorAndUpload(event.target.files);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleErrorAndUpload(event.dataTransfer.files);
  };

  return (
    <React.Fragment>
      <div
        className={`upload-section ${isDragging ? "active" : ""}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}>
        <div className="upload-logo" ref={logoUploadRef}>
          <MdUpload />
        </div>
        <div className="upload-info">{t("dragDrop")}</div>
        <div className={`private-info ${isDragging ? "active" : ""}`}>
          {t("private")}
        </div>
        {error && <div className="upload-error">{error}</div>}
        <input
          ref={inputRef}
          type="file"
          accept="audio/mpeg"
          hidden
          onChange={handleAudioSelect}
        />
        <button
          onClick={() => inputRef.current.click()}
          style={{ marginTop: 20 }}
          className={`btn ${isDragging ? "active" : ""}`}>
          {t("selectFile")}
        </button>
      </div>
      <div className="guildlines">{t("guildlines")}</div>
    </React.Fragment>
  );
}

export default UploadDragDrop;
