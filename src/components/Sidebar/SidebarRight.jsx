import { Link } from "react-router-dom";
import genreMenu from "./genreMenu.data";

function SidebarRight() {
  return (
    <div style={{ padding: "0 30px 20px" }}>
      <div className="sidebar-title">Genre</div>
      <div className="grid grid-column-3 gap-sm">
        {genreMenu.map((value, index) => {
          return (
            <div className="genre" key={index}>
              <Link to={value.link}>
                <div className="genre-image">
                  <img src={value.image} alt={value.alt} />
                </div>
                <div className="genre-name">{value.name}</div>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="sidebar-title">You may Like</div>
    </div>
  );
}

export default SidebarRight;
