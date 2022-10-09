function MusicContainer({ data }) {
  return (
    <div className="music-container">
      <img
        src={data.trackDetails.coverArt}
        alt="thumbnail"
        className="thumbnail-new"
      />
      <div className="song-name" title={data.trackDetails.title}>
        {data.trackDetails.title}
      </div>
      <div className="song-artists">{data.artistsDetails.name}</div>
    </div>
  );
}

export default MusicContainer;
