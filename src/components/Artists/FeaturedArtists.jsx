import { useNavigate } from "react-router-dom";

function FeaturedArtists({ data: artistsData }) {
  const navigate = useNavigate();
  const onClickContainer = (id) => navigate(`/artists/${id}`);

  return (
    <>
      <div className="artists-container">
        <div
          className="artists"
          title={artistsData.name}
          onClick={() => onClickContainer(artistsData._id)}>
          <img
            src={artistsData.profileImage}
            alt="artists"
            className="thumbnail-new"
            style={{ border: `2px solid white` }}
          />

          <div className="song-artists innerText" title={artistsData.fullname}>
            {artistsData.fullname}
          </div>
        </div>
      </div>
    </>
  );
}

export default FeaturedArtists;
