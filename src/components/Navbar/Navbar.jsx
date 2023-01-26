import { FiMenu } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { SearchBar } from "../Featured";

function Navbar({ handleSideBar }) {
  // const location = useLocation().pathname;

  return (
    <div className="navmenu">
      <div className="navmenu-hamburger" onClick={handleSideBar}>
        <FiMenu />
      </div>

      <div className="searchbar">{<SearchBar />}</div>
      <div></div>
    </div>
  );
}

export default Navbar;
