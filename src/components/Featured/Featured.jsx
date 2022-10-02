import FeaturedImage from "assets/images/featured.jpg";
import SearchBar from "./SearchBar";
import * as BiIcons from "react-icons/bi";

function Featured() {
  return (
    <div className="featured">
      <div className="featured-searchbar">
        <SearchBar />
      </div>

      <div className="image-section img">
        <img src={FeaturedImage} alt="cover" className="featured-img" />
      </div>

      <div className="details">
        <div className="title">Featured Songs</div>
        <div className="song-details">
          <div className="artists">Sunil Giri</div>
          <div className="song-name">Ko Hola Tyo</div>
        </div>
        <div className="play-featured">
          <button className="btn btn-play">Play</button>
          <BiIcons.BiHeart
            style={{
              width: 40,
              height: 40,
              padding: 10,
              color: "#f96666",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              marginLeft: 15,
              borderRadius: "50%",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Featured;
