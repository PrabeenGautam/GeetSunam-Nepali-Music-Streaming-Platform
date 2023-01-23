import { useState, useCallback } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import SearchBar from "./SearchBar";
import { Btn } from "@/components/StyledUI";
import PlaySong from "@/components/Player/PlaySong";
import PauseSong from "../Player/PauseSong";
import { toggleSongsFavourite } from "@/services/musicApi/postSongs.api";
import ActionCreators from "@/react-mui-player/redux/actionCreators";

function Featured({ data: featuredSongs, showSearchBar = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const songsDetails = featuredSongs[currentIndex];
  const currentSong = useSelector((state) => state);

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (song) => toggleSongsFavourite(song),
    {
      onSuccess: (updatedSongs) => {
        const songDB = updatedSongs.data.songs;

        if (currentSong.trackID === songDB._id) {
          dispatch(
            ActionCreators.getMusicDetails({
              ID: songDB._id,
              favourite: songDB.isFavourite,
            })
          );
        }

        queryClient.cancelQueries({ queryKey: ["featured"] });
        queryClient.setQueryData(["featured"], (old) => {
          const updatedSongsList = old.data.songs.map((song) => {
            if (song._id === songDB._id) return updatedSongs.data.songs;
            return song;
          });

          return {
            ...old,
            data: {
              songs: updatedSongsList,
            },
          };
        });
      },

      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["featured"] });
      },
    }
  );

  const buttonContainer = {
    position: "absolute",
    right: "20px",
    top: "20px",
    display: "flex",
    gap: "8px",
    zIndex: 999,
  };

  const fadeAnimation = (image) => {
    image[0].classList.remove("fade");
    void image[0].offsetWidth;
    image[0].classList.add("fade");
  };

  const goToPrevious = () => {
    const isFirstIndex = currentIndex === 0;
    const newIndex = isFirstIndex ? featuredSongs.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    fadeAnimation(document.getElementsByClassName("featured-img"));
  };

  const goToNext = useCallback(() => {
    const isLastIndex = currentIndex === featuredSongs.length - 1;
    const newIndex = isLastIndex ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    fadeAnimation(document.getElementsByClassName("featured-img"));
  }, [currentIndex, featuredSongs.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 8000);

    return () => clearInterval(timer);
  }, [currentIndex, goToNext]);

  const musicList =
    featuredSongs &&
    featuredSongs.map(({ trackDetails }) => ({
      ID: trackDetails.ID,
      coverArt: trackDetails.coverArt,
      title: trackDetails.title,
      artist: trackDetails.artist,
      source: trackDetails.source,
      favourite: trackDetails.isFavourite,
    }));

  const handleFavourite = async (event, song) => {
    event.preventDefault();
    if (isLoading) return;
    mutate(song._id);
  };

  return (
    <>
      <div className="featured">
        <div style={buttonContainer}>
          <div
            className="index-button"
            title="Go to Previous"
            onClick={goToPrevious}>
            <BiLeftArrow />
          </div>
          <div className="index-button" title="Go to Next" onClick={goToNext}>
            <BiRightArrow />
          </div>
        </div>
        {showSearchBar && (
          <div className="featured-searchbar">
            <SearchBar />
          </div>
        )}

        <div className="image-section img">
          <img
            src={songsDetails.trackDetails.coverArt}
            alt="cover"
            className="featured-img "
          />
        </div>

        <div className="details">
          <div className="title">Featured Songs</div>
          <div className="song-details">
            <div className="artists">{songsDetails.artists.fullname}</div>
            <div className="song-name">{songsDetails.trackDetails.title}</div>
          </div>
          {featuredSongs.map((value, index) => {
            return (
              <div
                className={`play-featured ${
                  index === currentIndex ? "" : "hidden"
                }`}
                key={index}>
                {currentSong.trackID === value._id &&
                currentSong.mediaState === "PLAYING" ? (
                  <PauseSong trackDetails={value.trackDetails}>
                    <Btn className="btn-pause">Pause</Btn>
                  </PauseSong>
                ) : (
                  <PlaySong
                    trackDetails={value.trackDetails}
                    musicList={musicList}>
                    <Btn className="btn-play">Play</Btn>
                  </PlaySong>
                )}

                <span onClick={(e) => handleFavourite(e, value)}>
                  {currentSong.trackID === value._id &&
                    (currentSong.favourite ? (
                      <AiFillHeart className="featured-heart" />
                    ) : (
                      <AiOutlineHeart className="featured-heart" />
                    ))}

                  {currentSong.trackID !== value._id &&
                    (value.trackDetails.isFavourite ? (
                      <AiFillHeart className="featured-heart" />
                    ) : (
                      <AiOutlineHeart className="featured-heart" />
                    ))}
                </span>
              </div>
            );
          })}
        </div>

        <div className="carosel">
          {featuredSongs.map((_, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  fadeAnimation(
                    document.getElementsByClassName("featured-img")
                  );
                }}
                className={currentIndex === index ? "active" : ""}></div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Featured;
