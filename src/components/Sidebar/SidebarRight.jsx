import { SearchBar } from "components/Featured";
import { Link } from "react-router-dom";
import genreMenu from "./genreMenu.data";
import ProfileImage from "assets/images/pas075bct029.jpg";

function SidebarRight() {
  return (
    <div className="sidebar-right">
      <Link
        to="/settings"
        className="userprofile"
        style={{
          marginTop: 20,
          borderBottom: "1px solid rgba(255,255,255,0.4",
          paddingBottom: 20,
        }}>
        <img src={ProfileImage} alt="" />
        <div className="userName">PrabinGautam</div>
      </Link>

      <div className="custom-searchbar">
        <SearchBar />
      </div>

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
    </div>
  );
}

export default SidebarRight;
