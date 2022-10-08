function MusicContainer({ trackData }) {
  return (
    <div className="music-container">
      <img src={trackData.coverArt} alt="thumbnail" className="thumbnail-new" />
      <div className="song-name" title={trackData.title}>
        {trackData.title}
      </div>
      <div className="song-artists">{trackData.artists}</div>
    </div>
  );
}

export default MusicContainer;
