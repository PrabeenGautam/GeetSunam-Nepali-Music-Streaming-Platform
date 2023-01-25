import CustomBreadcrumbs from "@/components/Breadcrumbs";
import { Btn } from "@/components/StyledUI";
import { getGenreData } from "@/hooks/useGenresData";
import { uploadSongs } from "@/services/musicApi/postSongs.api";
import { useState, useRef } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { toast } from "react-toastify";

function UploadSongs() {
  const { data: genres, isFetching } = getGenreData();
  const [formData, setFormData] = useState({});
  const [uploadedImage, setUploadedImage] = useState({});

  const [removeCoverArt, setRemoveCoverArt] = useState(false);
  const [removeAudio, setAudioRemove] = useState(false);

  const coverArtRef = useRef();
  const audioRef = useRef();

  const genreSelectOptions =
    !isFetching &&
    genres.map((genre) => ({
      label: genre.name,
      value: genre._id,
    }));

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    if (formData.title) postData.append("title", formData.title);
    if (formData.releaseDate)
      postData.append("releaseDate", formData.releaseDate);
    if (formData.genre) postData.append("genre", formData.genre);
    if (uploadedImage.coverArt)
      postData.append("coverArt", uploadedImage.coverArt);
    if (uploadedImage.source) postData.append("source", uploadedImage.source);

    const response = await uploadSongs(postData);
    if (response) {
      toast.success("Songs Uploaded Successfully");
    }
  };

  const fileUploadChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedImage((prev) => ({
        ...prev,
        [e.target.name]: e.target.files[0],
      }));
      if (e.target.name === "coverArt") setRemoveCoverArt(false);
      if (e.target.name === "source") setAudioRemove(false);
    }
  };

  const fileRemoveChange = (source) => {
    setUploadedImage((prev) => {
      delete prev[source];
      if (source === "coverArt") setRemoveCoverArt(true);
      if (source === "source") setAudioRemove(true);
      return prev;
    });
  };

  const getImageURL = (file) => {
    if (file) {
      return URL.createObjectURL(file);
    }
  };

  const handleCoverArt = () => {
    fileRemoveChange("coverArt");
    coverArtRef.current.value = "";
  };

  const handleAudio = () => {
    fileRemoveChange("source");
    audioRef.current.value = "";
  };

  return (
    <div className="content-container">
      <CustomBreadcrumbs link={"/upload"} textName="Upload Songs" />
      <h2>Upload Songs</h2>

      <div className="upload-form">
        <form onSubmit={handleSubmit}>
          <div className="form-flex">
            <div className="input-section">
              <label>Song Title: *</label>
              <input
                type="text"
                placeholder="Enter Songs title"
                className="input-text"
                name="title"
                onChange={handleInputChange}
              />
            </div>

            <div className="input-section">
              <label>Released Date: (Optional)</label>
              <input
                type="date"
                placeholder="Enter Songs title"
                className="input-text"
                name="releasedDate"
                onChange={handleInputChange}
              />
            </div>

            <div className="input-section">
              <label>Genre: (Optional)</label>
              <select onChange={handleInputChange} name="genre">
                <option>_</option>
                {!isFetching &&
                  genreSelectOptions.map((genre) => {
                    return (
                      <option key={genre.value} value={genre.value}>
                        {genre.label}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="upload image-upload mt-20">
              <div>Upload CoverArt</div>
              {!uploadedImage.coverArt && (
                <label htmlFor="coverArt" className="uploader flex-center">
                  <input
                    className="file-input"
                    type="file"
                    id="coverArt"
                    ref={coverArtRef}
                    accept="image/*"
                    name="coverArt"
                    hidden
                    onChange={fileUploadChange}
                  />
                  <AiOutlineCloudDownload />
                  <p>Browse File to Upload</p>
                </label>
              )}

              {!removeCoverArt && uploadedImage.coverArt && (
                <section className="file-preview mt-20">
                  <img
                    src={getImageURL(uploadedImage.coverArt)}
                    alt="coverArt"
                  />

                  <button
                    type="button"
                    className="mt-20"
                    onClick={handleCoverArt}>
                    Remove
                  </button>
                </section>
              )}
            </div>

            <div className="upload mt-20">
              <div>Upload Music</div>
              {!uploadedImage.source && (
                <label htmlFor="source" className="uploader flex-center">
                  <input
                    className="file-input"
                    type="file"
                    name="source"
                    id="source"
                    accept="audio/*"
                    hidden
                    onChange={fileUploadChange}
                  />
                  <AiOutlineCloudDownload />
                  <p>Browse Music to Upload</p>
                </label>
              )}
              {!removeAudio && uploadedImage.source && (
                <section className="file-preview column mt-20 music">
                  <audio
                    className="audio"
                    src={getImageURL(uploadedImage.source)}
                    controls></audio>
                  <button type="button" className="mt-20" onClick={handleAudio}>
                    Remove
                  </button>
                </section>
              )}
            </div>
          </div>

          <Btn className="mt-20 btn-play">Upload</Btn>
        </form>
      </div>
    </div>
  );
}

export default UploadSongs;
