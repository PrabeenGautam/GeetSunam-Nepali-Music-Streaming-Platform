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

        <AutoMarquee className={"song-name"} value={data.trackDetails.title} />
        <div className="song-artists">{data.artistsDetails.name}</div>
      </div>
    </PlaySong>
  );
}

export default MusicContainer;
