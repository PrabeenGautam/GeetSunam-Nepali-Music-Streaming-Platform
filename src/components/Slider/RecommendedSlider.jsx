import { Swiper, SwiperSlide } from "swiper/react";
import React, { useRef } from "react";
import * as BiIcons from "react-icons/bi";

import "swiper/css";
import MusicContainer from "components/MusicContainer";

function RecommendedSlider({ data }) {
  const swiperRef = useRef();
  const prevBtn = document.getElementsByClassName("swipe-prev");
  const nextBtn = document.getElementsByClassName("swipe-next");

  return (
    <div className="swiper-class">
      <div
        onClick={() => swiperRef.current?.slidePrev()}
        className="swiper-btn swipe-prev">
        <BiIcons.BiChevronLeft />
      </div>
      <div
        onClick={() => swiperRef.current?.slideNext()}
        className="swiper-btn swipe-next">
        <BiIcons.BiChevronRight />
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
        }}>
        {/*Change import Data*/}
        {data.map((value, index) => (
          <SwiperSlide key={index}>
            <MusicContainer data={value} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default RecommendedSlider;
