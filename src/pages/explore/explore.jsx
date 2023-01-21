import { Link } from "react-router-dom";
import { BiPlayCircle } from "react-icons/bi";
import { MdRecommend, MdLibraryMusic } from "react-icons/md";
import { useEffect, useState } from "react";

import CustomBreadcrumbs from "@/components/Breadcrumbs";
import { Featured } from "@/components/Featured";
import RecommendedSlider from "@/components/Slider/RecommendedSlider";
import { musicList } from "@/assets/data/musicList";
import PlaySong from "@/components/Player/PlaySong";
import Loading from "@/components/Loading";

import { trackDetails } from "@/utils/trackDetails.utils";
import { getAllSongsAPI } from "@/services/musicApi/getSongs.api";
import getFeaturedSongs from "@/services/musicApi/getFeaturedSongs.api";

function Explore() {
  const recommendedSongs = musicList.slice(4, 14);
  const [featuredSongs, setFeaturedSongs] = useState(null);
  const [songs, setSongs] = useState(null);
  const [changeFavourite, setChangeFavourite] = useState(false);

  useEffect(() => {
    const fetchSongs = async function () {
      const featuredSongs = await getFeaturedSongs();
      setFeaturedSongs(trackDetails(featuredSongs.data.songs));
    };

    fetchSongs();
  }, [changeFavourite]);

  useEffect(() => {
    const fetchSongs = async function () {
      const allSongs = await getAllSongsAPI();
      const songs = allSongs.data.songs;
      setSongs(trackDetails(songs));
    };

    fetchSongs();
  }, []);
  return songs ? (
    <div className="content-container">
      <CustomBreadcrumbs link={"/explore"} textName="Explore" />

      <div className="main-section">
        <Featured
          data={featuredSongs}
          setChangeFavourite={setChangeFavourite}
        />
      </div>

      <div className="main-section">
        <div className="heading">
          <div className="subheading">
            <span>Recommended for you</span>
            <MdRecommend className="heading_icons" />
          </div>
          <Link to={"/recommendation"} className="see-more">
            See All
          </Link>
        </div>

        <div className="content-section">
          <RecommendedSlider data={recommendedSongs} />
        </div>
      </div>

      <div className="main-section">
        <div className="heading">
          <div className="subheading">
            <span>Library</span>
            <MdLibraryMusic className="heading_icons" />
          </div>
        </div>

        <div className="music-section">
          {songs.map((values) => {
            return (
              <PlaySong trackDetails={values.trackDetails} key={values._id}>
                <div className="music-container dynamic" key={values._id}>
                  <div className="play-icon-container">
                    <img
                      src={values.coverArt}
                      alt="thumbnail"
                      className="thumbnail-new"
                    />

                    <span className="play-icon">
                      <BiPlayCircle />
                    </span>
                  </div>

                  <div className="song-name innerText" title={values.title}>
                    {values.title}
                  </div>

                  <div className="song-artists">{values.artists.fullname}</div>
                </div>
              </PlaySong>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Explore;
