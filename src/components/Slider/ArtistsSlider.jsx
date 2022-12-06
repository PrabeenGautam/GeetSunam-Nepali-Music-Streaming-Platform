import "swiper/css";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

import FeaturedArtists from "components/Artists/FeaturedArtists";

function ArtistsSlider({ featuredArtists }) {
  const swiperRef = useRef();
  const prevBtnRef = useRef();
  const nextBtnRef = useRef();

  return (
    <div className="swiper-class swiper-artists">
      <div
        onClick={() => swiperRef.current?.slidePrev()}
        className="swiper-btn swipe-artists-btn swipe-prev-artists"
        ref={prevBtnRef}>
        <BiChevronLeft />
      </div>
      <div
        onClick={() => swiperRef.current?.slideNext()}
        className="swiper-btn swipe-artists-btn swipe-next-artists"
        ref={nextBtnRef}>
        <BiChevronRight />
      </div>
      <Swiper
        slidesPerView="auto"
        spaceBetween={10}
        grabCursor={true}
        onSwiper={(swiper) => {
          swiper.isBeginning === true &&
            prevBtnRef.current.classList.add("deactivate");
        }}
        onSlideChange={(swiper) => {
          nextBtnRef.current.classList.remove("deactivate");
          prevBtnRef.current.classList.remove("deactivate");

          if (swiper.isBeginning === true) {
            prevBtnRef.current.classList.add("deactivate");
          }

          if (swiper.isEnd === true) {
            nextBtnRef.current.classList.add("deactivate");
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
