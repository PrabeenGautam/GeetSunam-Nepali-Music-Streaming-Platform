import React from "react";
import { useParams } from "react-router-dom";

import getSongsByGenre from "@/services/musicApi/getSongsByGenre.api";
import { trackDetails } from "./../../utils/trackDetails.utils";
import RecentPlayed from "@/components/SongsList";
import { useQuery } from "react-query";
import { PlaylistLoader } from "@/components/Loader/LoaderComponents";
import Spinner from "@/components/Loader/Spinner";
import { useGenreData } from "@/hooks/useGenresData";

function GenreContainer() {
  const { id: genreID } = useParams();

  const {
    data: genre,
    isLoading: isLoadingGenre,
    isError: isErrorGenre,
  } = useGenreData(genreID);

  const {
    data,
    isLoading: isLoadingSongs,
    isError: isErrorSongs,
  } = useQuery(["genre-song", genreID], () => getSongsByGenre(genreID), {
    select: (result) => result.data.songs,
  });

  const songs = data && trackDetails(data);
  const loaderGenre = isLoadingGenre || isErrorGenre;
  const loaderSong = isLoadingSongs || isErrorSongs;

  return (
    <div className="playlist-container">
      <section className="playlist">
        {!loaderGenre ? (
          <React.Fragment>
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
                <span>{!loaderSong && `${songs.length} Songs`}</span>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <PlaylistLoader />
        )}
      </section>

      {!loaderSong ? (
        <section className="padding">
          <RecentPlayed data={songs} />
        </section>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default GenreContainer;
