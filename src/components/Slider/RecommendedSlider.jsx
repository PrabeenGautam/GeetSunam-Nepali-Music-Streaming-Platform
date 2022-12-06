import "swiper/css";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import MusicContainer from "components/MusicContainer";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

function RecommendedSlider({ data }) {
  const swiperRef = useRef();
  const prevBtnRef = useRef();
  const nextBtnRef = useRef();

  return (
    <div className="swiper-class">
      <div
        ref={prevBtnRef}
        onClick={() => swiperRef.current?.slidePrev()}
        className="swiper-btn swipe-prev">
        <BiChevronLeft />
      </div>
      <div
        ref={nextBtnRef}
        onClick={() => swiperRef.current?.slideNext()}
        className="swiper-btn swipe-next">
        <BiChevronRight />
      </div>
      <Swiper
        slidesPerView="auto"
        spaceBetween={20}
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
