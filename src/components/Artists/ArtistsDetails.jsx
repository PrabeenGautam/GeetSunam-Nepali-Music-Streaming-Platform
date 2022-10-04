import { featuredArtists } from "components/Featured/featureArtists.data";
import React from "react";
import { useParams } from "react-router-dom";
import * as FiIcons from "react-icons/fi";
import ArtistsPlayed from "./ArtistsPlayed";
import FeaturedArtists from "components/Featured/FeaturedArtists";

function ArtistsDetails({ setDeleteClick = false }) {
  const { id } = useParams();
  const artistsDetails = featuredArtists[id];
  const recommendedArtists = featuredArtists.filter(
    (value) => value.id !== Number(id)
  );

  return (
    <>
      <div className="playlist-container gradient">
        <section className="playlist">
          <div className="artists-images">
            <img src={artistsDetails.img} alt="thumbnail" />
          </div>
          <div className="playlist-details">
            <div>Artists</div>
            <div>{artistsDetails.name}</div>
            <div>
              <span>GeetSunam</span>
              <span style={{ fontWeight: "bold" }}>.</span>
              <span>12 songs</span>
            </div>
          </div>
          <div style={{ position: "absolute", right: 20, zIndex: 999 }}>
            <button
              className="custom-btn"
              title="Remove from Favourite"
              onClick={() => setDeleteClick(true)}>
              <FiIcons.FiHeart
                style={{
                  fill: "var(--highlight)",
                  stroke: "var(--highlight)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </button>
          </div>
        </section>

        <div className="padding">
          <ArtistsPlayed />
          <h2>People Also Likes</h2>

          <FeaturedArtists featuredArtists={recommendedArtists} />
        </div>
      </div>
    </>
  );
}

export default ArtistsDetails;
