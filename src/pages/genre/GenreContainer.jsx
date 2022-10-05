import RecentPlayed from "components/RecentPlayed";
import React from "react";
import * as Icons from "react-icons/fi";
import { useParams } from "react-router-dom";

function GenreContainer() {
  const { genreName } = useParams();
  return (
    <>
      <div className="playlist-container">
        <section className="playlist">
          <div className="playlist-images">
            <Icons.FiHeart />
          </div>
          <div className="playlist-details">
            <div>Genre</div>
            <div>{genreName.toUpperCase()}</div>
            <div className="description">
              {"A collection of music classified by genre "}
              <span
                style={{
                  fontWeight: 700,
                  color: "white",
                  textTransform: "capitalize",
                }}>
                {genreName}
              </span>
            </div>
            <div>
              <span>GeetSunam</span>
              <span style={{ fontWeight: "bold" }}>.</span>
              <span>12 songs</span>
            </div>
          </div>
        </section>

        <section className="padding">
          <RecentPlayed />
        </section>
      </div>
    </>
  );
}

export default GenreContainer;
