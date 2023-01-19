import { Link } from "react-router-dom";
import { BiPause, BiPlay } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi";

import Featured from "./Featured/Featured";
import RecentPlayed from "./SongsList";
import RecentlyPlayedSlider from "./Slider/RecentlyPlayedSlider";
import ArtistsSlider from "./Slider/ArtistsSlider";
import { musicList } from "@/assets/data/musicList";
import CustomBreadcrumbs from "./Breadcrumbs";
import { featuredArtists } from "./Featured/featureArtists.data";
import PlaySong from "./Player/PlaySong";
import AutoMarquee from "./Slider/AutoMarquee";

function Content() {
  const featuredSongs = musicList.filter(
    (value) => value.trackDetails.isFeatured === true
  );
  const releaseSongs = musicList.slice(0, 10);
  const artists = featuredArtists.slice(0, 10);
  const recentSongs = musicList.slice(0, 6);

  /* Temporary  */
  const trackDetails = {
    ID: 1,
    title: "Ko Hola Tyo",
    coverArt:
      "http://127.0.0.1:8000/imgs/songs/song-Pop-Songs-1673354919879.png",
    artists: "Sinil GIri (Test)",
    source: "http://127.0.0.1:8000/api/songs/stream/63c7e2f71f3cfc4e38047e30",
    isFavourite: false,
    isFeatured: true,
  };

  return (
    <div className="content-container">
      <CustomBreadcrumbs link={"/home"} textName="Home" />
      <Featured data={featuredSongs} showSearchBar={true} />
      <div className="main-section">
        <div className="heading">
          <div className="subheading">
            <span>New Releases</span>
            <BiPlay className="heading_icons" />
          </div>
          <Link to={"/releases"} className="see-more">
            See All
          </Link>
        </div>

        <div className="content-section">
          <RecentlyPlayedSlider musicList={releaseSongs} />
        </div>
      </div>

      <div className="main-section">
        <div className="heading">
          <div className="subheading">
            <span>testing Songs API (temporary)</span>
          </div>
        </div>

        <div className="content-section">
          <PlaySong trackDetails={trackDetails}>
            <div className="music-container">
              <div className="play-icon-container">
                <img
                  src={trackDetails.coverArt}
                  alt="thumbnail"
                  className="thumbnail-new"
                />

                <span className="play-icon">
                  <BiPlay />
                </span>
              </div>

              <AutoMarquee className={"song-name"} value={trackDetails.title} />
              <div className="song-artists">{"Testing"}</div>
            </div>
          </PlaySong>
        </div>
      </div>

      <div className="main-section">
        <div className="heading">
          <div className="subheading">
            <span>Featured Artists</span>
            <HiOutlineUser className="heading_icons" />
          </div>
        </div>

        <div className="content-section">
          <ArtistsSlider featuredArtists={artists} />
        </div>
      </div>

      <div className="main-section">
        <div className="subheading" style={{ marginBottom: 20 }}>
          <span>Recently Played</span>
          <BiPause className="heading_icons" />
        </div>

        <RecentPlayed removeFromPlaylist={false} data={recentSongs} />
      </div>
    </div>
  );
}

export default Content;
