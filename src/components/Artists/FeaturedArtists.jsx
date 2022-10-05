import { useNavigate } from "react-router-dom";

function FeaturedArtists({ featuredArtists }) {
  const navigate = useNavigate();
  const onClickContainer = (id) => navigate(`artists/${id}`);
  return (
    <>
      <div className="artists-container featured-container">
        {featuredArtists.map((value, index) => {
          return (
            <div
              key={index}
              className="artists"
              title={value.name}
              onClick={() => onClickContainer(index)}>
              <img
                src={value.img}
                alt="artists"
                className="thumbnail-new"
                style={{ border: `2px solid white` }}
              />
              <div className="song-artists">{value.name}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default FeaturedArtists;
