import { FiMenu } from "react-icons/fi";
import { SearchBar } from "../Featured";
import useGSSelector from "@/redux/useGSSelector";
import LoginUser from "../Sidebar/LoginUser";

function Navbar({ handleSideBar }) {
  const authUser = useGSSelector((state) => state?.userState?.userData);

  return (
    <div className="navmenu " style={{ justifyContent: "space-between" }}>
      <div className="navmenu-hamburger" onClick={handleSideBar}>
        <FiMenu />
      </div>
      <div className="searchbar">{<SearchBar />}</div>
      <div className="user-detail">
        <LoginUser userData={authUser} />
      </div>
    </div>
  );
}

export default Navbar;
