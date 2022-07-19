import React from "react";
import GenreImage from "../../assets/genre/Pop.jpg";
import Dohori from "../../assets/genre/dohori.jpg";
import Teej from "../../assets/genre/teej.png";
import Placeholder from "../../assets/genre/placeholder-image.jpg";

function SidebarRight() {
  return (
    <div style={{ padding: "0 30px 20px" }}>
      <div className="title">Genre</div>
      <div className="grid grid-column-3 gap-sm">
        <div className="genre">
          <div className="genre-image">
            <img src={GenreImage} alt="pop music" />
          </div>
          <div className="genre-name">Pop</div>
        </div>

        <div className="genre">
          <div className="genre-image">
            <img src={Placeholder} alt="classical music" />
          </div>
          <div className="genre-name">Classical</div>
        </div>

        <div className="genre">
          <div className="genre-image">
            <img src={Placeholder} alt="rock music" />
          </div>
          <div className="genre-name">Rock</div>
        </div>

        <div className="genre">
          <div className="genre-image">
            <img src={Dohori} alt="dohori music" />
          </div>
          <div className="genre-name">Dohori</div>
        </div>

        <div className="genre">
          <div className="genre-image">
            <img src={Teej} alt="teej music" />
          </div>
          <div className="genre-name">Pop</div>
        </div>

        <div className="genre">
          <div className="genre-image">
            <img src={Placeholder} alt="adhunik music" />
          </div>
          <div className="genre-name">Adhunik</div>
        </div>

        <div className="genre">
          <div className="genre-image">
            <img src={Placeholder} alt="gajal music" />
          </div>
          <div className="genre-name">Gajal</div>
        </div>

        <div className="genre">
          <div className="genre-image">
            <img src={Placeholder} alt="hiphop music" />
          </div>
          <div className="genre-name">Hiphop</div>
        </div>
      </div>

      <div className="title">You may Like</div>
    </div>
  );
}

export default SidebarRight;
