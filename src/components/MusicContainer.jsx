import { BiPlayCircle } from "react-icons/bi";

import PlaySong from "./Player/PlaySong";
import AutoMarquee from "./Slider/AutoMarquee";

function MusicContainer({ data }) {
  return (
    <PlaySong trackDetails={data.trackDetails}>
      <div className="music-container">
        <div className="play-icon-container">
          <img
            src={data.trackDetails.coverArt}
            alt="thumbnail"
            className="thumbnail-new"
          />
          <span className="play-icon">
            <BiPlayCircle />
          </span>
        </div>

        <div className="container-artists">
          <div className="song-name" title={data.trackDetails.title}>
            {data.trackDetails.title}
          </div>

          <div className="song-artists">{data.artists.fullname}</div>
        </div>
      </div>
    </PlaySong>
  );
}

export default MusicContainer;
