function FeaturedArtists({featuredArtists}) {
  return (
    <>
      <div className="artists-container">
        {featuredArtists.map((value, index) => {
          return (
            <div key={index} className="artists" title={value.name}>
              <img
                src={value.img}
                alt="artists"
                className="thumbnail-new"
                style={{ border: `2px solid white` }}
              />
              <div className="song-artists">{value.name}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default FeaturedArtists;
