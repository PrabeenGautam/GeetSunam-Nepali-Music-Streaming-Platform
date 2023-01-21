function ArtistsContainer({ artistsData, onClickArtists }) {
  return (
    <section
      className="fav-artists-container"
      style={{ padding: "0 2.5rem 2rem" }}>
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
