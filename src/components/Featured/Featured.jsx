import { useState, useRef } from "react";
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
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

function Featured({ data: featuredSongs, showSearchBar = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSong = useSelector((state) => state);
  const swiperRef = useRef();

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { t } = useTranslation("translation", { keyPrefix: "homePage" });

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
    <div className="featured">
      <Swiper
        spaceBetween={20}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        speed={800}
        loop={true}
        modules={[Autoplay]}
        pagination={{ el: ".carosel", clickable: true }}
        onSlideChange={() => {
          setCurrentIndex(swiperRef.current.realIndex);
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}>
        <div style={buttonContainer}>
          <div
            className="index-button"
            title="Go to Previous"
            onClick={() => swiperRef.current?.slidePrev()}>
            <BiLeftArrow />
          </div>
          <div
            className="index-button"
            title="Go to Next"
            onClick={() => swiperRef.current?.slideNext()}>
            <BiRightArrow />
          </div>
        </div>
        {showSearchBar && (
          <div className="featured-searchbar">
            <SearchBar />
          </div>
        )}
        {featuredSongs.map((value, index) => {
          return (
            <SwiperSlide key={value._id}>
              <div className="image-section img">
                <img
                  src={value.trackDetails.coverArt}
                  alt="cover"
                  className="featured-img "
                />
              </div>

              <div className="details">
                <div className="title">{t("featuredSongs")}</div>
                <div className="song-details">
                  <div className="artists">{value.artists.fullname}</div>
                  <div className="song-name">{value.trackDetails.title}</div>
                </div>

                <div className={`play-featured`} key={index}>
                  {currentSong.trackID === value._id &&
                  currentSong.mediaState === "PLAYING" ? (
                    <PauseSong trackDetails={value.trackDetails}>
                      <Btn className="btn-pause">{t("pause")}</Btn>
                    </PauseSong>
                  ) : (
                    <PlaySong
                      trackDetails={value.trackDetails}
                      musicList={musicList}>
                      <Btn className="btn-play">{t("play")}</Btn>
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
              </div>
            </SwiperSlide>
          );
        })}
        <div className="carosel">
          {featuredSongs.map((_, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  swiperRef.current.slideTo(index);
                }}
                className={currentIndex === index ? "active" : ""}></div>
            );
          })}
        </div>
      </Swiper>
    </div>
  );
}

export default Featured;
