import CustomBreadcrumbs from "components/Breadcrumbs";
import MusicContainer from "components/MusicContainer";
import React from "react";
import * as BiIcons from "react-icons/bi";
import * as MdIcons from "react-icons/md";
import FeaturedImage from "assets/images/featured.jpg";
import { Link } from "react-router-dom";
import { Btn } from "components/StyledUI";

function Explore() {
  const array = new Array(12).fill(1);
  return (
    <div className="content-container">
      <CustomBreadcrumbs link={"/explore"} textName="Explore" />

      <div className="main-section">
        <div className="featured">
          <div className="image-section custom-img">
            <img src={FeaturedImage} alt="cover" className="featured-img" />
          </div>

          <div className="custom-details">
            <div className="song-details">
              <div className="artists">Sunil Giri</div>
              <div className="song-name">Ko Hola Tyo</div>
            </div>
            <div style={{ marginTop: "1.875rem", display: "flex" }}>
              <Btn className="btn-play">Play</Btn>
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
      </div>

      <div className="main-section">
        <div className="heading">
          <div className="subheading">
            <span>Recommended for you</span>
            <MdIcons.MdRecommend className="heading_icons" />
          </div>
          <Link to={"/recommendation"} className="see-more">
            See All
          </Link>
        </div>

        <div className="content-section">
          <MusicContainer />
          <MusicContainer />
          <MusicContainer />
          <MusicContainer />
          <MusicContainer />
          <MusicContainer />
          <MusicContainer />
        </div>
      </div>

      <div className="main-section">
        <div className="heading">
          <div className="subheading">
            <span>Library</span>
            <MdIcons.MdLibraryMusic className="heading_icons" />
          </div>
        </div>

        <div className="music-section">
          {array.map((values, index) => {
            return (
              <div className="music-container" key={index}>
                <img
                  src="https://img.youtube.com/vi/Bn5Qpr79LQw/maxresdefault.jpg"
                  alt="thumbnail"
                  className="thumbnail-new"
                />
                <div className="song-name" title="Aayo Teejko Lahar">
                  Aayo Teejko Lahar
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Explore;
