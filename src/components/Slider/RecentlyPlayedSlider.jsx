import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import {
  BiChevronLeft,
  BiChevronRight,
  BiPlayCircle as BiPlay,
} from "react-icons/bi";

import AutoMarquee from "./AutoMarquee";
import PlaySong from "components/Player/PlaySong";

function RecentlyPlayedSlider({ musicList }) {
  const swiperRef = useRef();
  const prevBtn = document.getElementsByClassName("swipe-prev");
  const nextBtn = document.getElementsByClassName("swipe-next");

  return (
    <div className="swiper-class">
      <div
        onClick={() => swiperRef.current?.slidePrev()}
        className="swiper-btn swipe-prev"
      >
        <BiChevronLeft />
      </div>
      <div
        onClick={() => swiperRef.current?.slideNext()}
        className="swiper-btn swipe-next"
      >
        <BiChevronRight />
      </div>
      <Swiper
        slidesPerView={6}
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
        }}
      >
        {musicList.map((value, index) => (
          <SwiperSlide key={index}>
            <div className="music-container">
              <PlaySong trackDetails={value.trackDetails}>
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
              </PlaySong>
              <AutoMarquee
                className={"song-name"}
                value={value.trackDetails.title}
              />
              <div className="song-artists">{value.artistsDetails.name}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default RecentlyPlayedSlider;
