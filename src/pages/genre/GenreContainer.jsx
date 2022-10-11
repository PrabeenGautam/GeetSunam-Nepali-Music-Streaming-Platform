import React from "react";
import { useParams } from "react-router-dom";

import { musicList } from "assets/data/musicList";
import RecentPlayed from "components/RecentPlayed";
import { genreMenu } from "components/Sidebar";

function GenreContainer() {
  const { genreName } = useParams();
  const indexOfGenre = genreMenu.findIndex(
    (value) => value.name.toLowerCase() === genreName
  );

  const musicData = musicList.filter(
    (value) => value.genre.toLowerCase() === genreName
  );

  return (
    <>
      <div className="playlist-container">
        <section className="playlist">
          <div className="artists-images">
            <img src={genreMenu[indexOfGenre].image} alt="genre" />
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
                }}
              >
                {genreName}
              </span>
            </div>
            <div>
              <span>GeetSunam</span>
              <span style={{ fontWeight: "bold" }}>.</span>
              <span>
                {musicData.length === 0
                  ? "No Songs"
                  : `${musicData.length} Songs`}
              </span>
            </div>
          </div>
        </section>

        <section className="padding">
          <RecentPlayed data={musicData} />
        </section>
      </div>
    </>
  );
}

export default GenreContainer;
