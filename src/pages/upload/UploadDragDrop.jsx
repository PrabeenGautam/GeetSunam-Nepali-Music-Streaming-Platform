import React from "react";
import { useRef, useState } from "react";
import { MdUpload } from "react-icons/md";

function UploadDragDrop({ handleErrorAndUpload, logoUploadRef, error }) {
  const inputRef = useRef();

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
        <div className="upload-info">
          Drag and Drop mp3 audio files to upload
        </div>
        <div className={`private-info ${isDragging ? "active" : ""}`}>
          Your songs will be private until you publish them.
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
          Select File
        </button>
      </div>
      <div className="guildlines">
        Please ensure that you have uploaded the correct songs and that you have
        the legal right to upload them. Uploading copyrighted songs without
        permission is against the law and may result in legal consequences and
        which could get you banned from the platform.
      </div>
    </React.Fragment>
  );
}

export default UploadDragDrop;
