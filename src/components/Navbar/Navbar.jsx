import { FiMenu } from "react-icons/fi";
import { RiChatUploadFill } from "react-icons/ri";
import { SearchBar } from "../Featured";

function Navbar({ handleSideBar, setClickUpload }) {
  // const location = useLocation().pathname;

  return (
    <div className="navmenu">
      <div className="navmenu-hamburger" onClick={handleSideBar}>
        <FiMenu />
      </div>

      <div className="searchbar">{<SearchBar />}</div>
      <div className="icons flex-center" onClick={() => setClickUpload(true)}>
        <RiChatUploadFill />
      </div>
    </div>
  );
}

export default Navbar;
