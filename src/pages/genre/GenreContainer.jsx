import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import getSongsByGenre from "@/services/musicApi/getSongsByGenre.api";
import Loading from "@/components/Loading";
import { getGenresByID } from "@/services/musicApi/getGenres.api";

function GenreContainer() {
  const { id: genreID } = useParams();

  const [songs, setGenreSongs] = useState(null);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const fetchGenreSong = async () => {
      const result = await getSongsByGenre(genreID);
      const genreResult = await getGenresByID(genreID);
      setGenreSongs(result.data.songs);
      setGenre(genreResult.data.genre);
    };

    fetchGenreSong();
  }, [genreID]);

  return songs && genre ? (
    <>
      <div className="playlist-container">
        <section className="playlist">
          <div className="artists-images">
            <img src={genre.image} alt="genre" />
          </div>
          <div className="playlist-details">
            <div>Genre</div>
            <div>{genre.name}</div>
            <div className="description">
              {"A collection of music classified by genre "}
              <span
                style={{
                  fontWeight: 700,
                  color: "white",
                  textTransform: "capitalize",
                }}>
                {genre.name}
              </span>
            </div>
            <div>
              <span>GeetSunam</span>
              <span style={{ fontWeight: "bold" }}>.</span>
              <span>
                {songs.length === 0 ? "No Songs" : `${songs.length} Songs`}
              </span>
            </div>
          </div>
        </section>

        <section className="padding">
          {/* <RecentPlayed data={musicData} /> */}
        </section>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default GenreContainer;
