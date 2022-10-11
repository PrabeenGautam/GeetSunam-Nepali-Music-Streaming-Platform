import { Swiper, SwiperSlide } from "swiper/react";
import React, { useRef } from "react";

import "swiper/css";
import AutoMarquee from "./AutoMarquee";
import {
  BiChevronLeft,
  BiChevronRight,
  BiPlayCircle as BiPlay,
} from "react-icons/bi";
import PlaySong from "components/Player/PlaySong";

function RecentlyPlayedSlider({ musicList }) {
  const swiperRef = useRef();
  const prevBtn = document.getElementsByClassName("swipe-prev");
  const nextBtn = document.getElementsByClassName("swipe-next");

  return (
    <div className="swiper-class">
      <div
        onClick={() => swiperRef.current?.slidePrev()}
        className="swiper-btn swipe-prev">
        <BiChevronLeft />
      </div>
      <div
        onClick={() => swiperRef.current?.slideNext()}
        className="swiper-btn swipe-next">
        <BiChevronRight />
      </div>
      <Swiper
        slidesPerView={5}
        grabCursor={true}
        onSwiper={(swiper) => {
          swiper.isBeginning === true && prevBtn[0].classList.add("deactivate");
        }}
        onSlideChange={(swiper) => {
          nextBtn[0].classList.remove("deactivate");
          prevBtn[0].classList.remove("deactivate");

          if (swiper.isBeginning === true) {
            prevBtn[0].classList.add("deactivate");
          }

          if (swiper.isEnd === true) {
            nextBtn[0].classList.add("deactivate");
          }
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}>
        {musicList.map((value, index) => (
          <SwiperSlide key={index}>
            <PlaySong trackDetails={value.trackDetails}>
              <div className="music-container">
                <div className="play-icon-container">
                  <img
                    src={value.trackDetails.coverArt}
                    alt="thumbnail"
                    className="thumbnail-new"
                  />

                  <span className="play-icon">
                    <BiPlay />
                  </span>
                </div>

                <AutoMarquee
                  className={"song-name"}
                  value={value.trackDetails.title}
                />
                <div className="song-artists">{value.artistsDetails.name}</div>
              </div>
            </PlaySong>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default RecentlyPlayedSlider;
