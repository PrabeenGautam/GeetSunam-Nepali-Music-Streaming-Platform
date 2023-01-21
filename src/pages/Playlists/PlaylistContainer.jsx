function PlaylistsContainer({ data, onClickPlaylists }) {
  return (
    <section
      className="fav-artists-container"
      style={{ padding: "0rem 2.5rem 2rem" }}>
      {data.map((value) => {
        return (
          <div
            className="artists"
            title={value.title}
            key={value._id}
            onClick={() => onClickPlaylists(value._id)}>
            <img
              src={value.coverArt}
              alt="playlists"
              className="thumbnail-new"
            />
            <div className="song-artists">{value.title}</div>
          </div>
        );
      })}
    </section>
  );
}

export default PlaylistsContainer;
