import { Swiper, SwiperSlide } from "swiper/react";
import React, { useRef } from "react";
import * as BiIcons from "react-icons/bi";

import "swiper/css";
import FeaturedArtists from "components/Artists/FeaturedArtists";
import { featuredArtists } from "components/Featured/featureArtists.data";

function ArtistsSlider() {
  const swiperRef = useRef();
  const prevBtn = document.getElementsByClassName("swipe-prev-artists");
  const nextBtn = document.getElementsByClassName("swipe-next-artists");

  return (
    <div className="swiper-class">
      <div
        onClick={() => swiperRef.current?.slidePrev()}
        className="swiper-btn swipe-artists-btn swipe-prev-artists">
        <BiIcons.BiChevronLeft />
      </div>
      <div
        onClick={() => swiperRef.current?.slideNext()}
        className="swiper-btn swipe-artists-btn swipe-next-artists">
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
        {featuredArtists.map((value, index) => (
          <SwiperSlide key={index}>
            <FeaturedArtists data={value} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ArtistsSlider;
