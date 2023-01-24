function ArtistsContainer({ artistsData, onClickArtists, padding = true }) {
  return (
    <section
      className="fav-artists-container dynamic"
      style={{ padding: padding ? "0 2.5rem 2rem" : "0rem" }}>
      {artistsData.map((value) => {
        return (
          <div
            className="artists"
            title={value.fullname}
            key={value._id}
            onClick={() => onClickArtists(value._id)}>
            <img
              src={value.profileImage}
              alt="artists"
              className="thumbnail-new"
            />
            <div className="song-artists">{value.fullname}</div>
          </div>
        );
      })}
    </section>
  );
}

export default ArtistsContainer;
