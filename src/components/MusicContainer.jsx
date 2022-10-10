import AutoMarquee from "./Slider/AutoMarquee";

function MusicContainer({ data }) {
  return (
    <div className="music-container">
      <img
        src={data.trackDetails.coverArt}
        alt="thumbnail"
        className="thumbnail-new"
      />
      <AutoMarquee className={"song-name"} value={data.trackDetails.title} />

      <div className="song-artists">{data.artistsDetails.name}</div>
    </div>
  );
}

export default MusicContainer;
