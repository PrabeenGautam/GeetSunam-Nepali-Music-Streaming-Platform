import { useParams } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

import { featuredArtists } from "components/Featured/featureArtists.data";
import ArtistsPlayed from "./ArtistsPlayed";
import { musicList } from "assets/data/musicList";

function ArtistsDetails() {
  const { id } = useParams();
  const artistsDetails = featuredArtists[id];
  const data = musicList.filter(
    (value) => value.artistsDetails.id === Number(id)
  );

  return (
    <>
      <div className="playlist-container gradient">
        <section className="playlist">
          <div className="artists-images">
            <img src={artistsDetails.profile} alt="thumbnail" />
          </div>
          <div className="playlist-details">
            <div>Artists</div>
            <div>{artistsDetails.name}</div>
            <div>
              <span>GeetSunam</span>
              <span style={{ fontWeight: "bold" }}>.</span>
              <span>{data.length} songs</span>
            </div>
          </div>
          <div style={{ position: "absolute", right: 20, zIndex: 999 }}>
            <button className="custom-btn" title="Remove from Favourite">
              {artistsDetails.isFavourite ? (
                <FiHeart
                  style={{
                    fill: "var(--highlight)",
                    stroke: "var(--highlight)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              ) : (
                <FiHeart
                  style={{
                    stroke: "var(--highlight)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              )}
            </button>
          </div>
        </section>

        <div className="padding">
          <ArtistsPlayed data={data} />
        </div>
      </div>
    </>
  );
}

export default ArtistsDetails;
