import { Skeleton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

function SongsLoader() {
  return (
    <div className="skeleton-container">
      <span className="skeleton-root sk-image"></span>
      <span className="skeleton-root sk-title mt-10"></span>
      <span className="skeleton-root sk-text mt-10"></span>
    </div>
  );
}

function ArtistsLoader() {
  return (
    <div className="skeleton-container">
      <span className="skeleton-root sk-circle"></span>
      <span className="skeleton-root sk-title mt-10"></span>
    </div>
  );
}

function SongsTableLoader() {
  return (
    <div className="skeleton-container" style={{ width: "100%" }}>
      <span className="skeleton-root sk-title"></span>
      <span className="skeleton-root sk-title mt-10"></span>
      <span className="skeleton-root sk-title mt-10"></span>
      <span className="skeleton-root sk-title mt-10"></span>
      <span className="skeleton-root sk-title mt-10"></span>
      <span className="skeleton-root sk-title mt-10"></span>
      <span className="skeleton-root sk-title mt-10"></span>
      <span className="skeleton-root sk-title mt-10"></span>
      <span className="skeleton-root sk-title mt-10"></span>
    </div>
  );
}

function SongsSwiperLoader() {
  const demoArray = new Array(10).fill(0);

  return (
    <div className="swiper-class">
      <Swiper slidesPerView="auto" spaceBetween={20} grabCursor={true}>
        {demoArray.map((_, index) => (
          <SwiperSlide key={"swiper" + index}>
            <SongsLoader />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function ArtistsSwiperLoader() {
  const demoArray = new Array(10).fill(0);

  return (
    <div className="swiper-class">
      <Swiper slidesPerView="auto" spaceBetween={20} grabCursor={true}>
        {demoArray.map((_, index) => (
          <SwiperSlide key={"swiper" + index}>
            <ArtistsLoader />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function SongTwoRowLoader() {
  const array = new Array(10).fill(0);
  return array.map((_, index) => <SongsLoader key={"Songs " + index} />);
}

function PlaylistLoader() {
  return (
    <Skeleton
      sx={{ bgcolor: "#212121" }}
      variant="rectangular"
      width={"100%"}
      height={"20rem"}
      animation="wave"
    />
  );
}

export {
  SongsSwiperLoader,
  ArtistsSwiperLoader,
  SongsTableLoader,
  SongTwoRowLoader,
  SongsLoader,
  PlaylistLoader,
};
export default SongsLoader;
