import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaMusic, FaUserShield } from "react-icons/fa";
import { FiHeart, FiLogOut, FiMusic, FiTrendingUp } from "react-icons/fi";

import { resetLogin } from "@/redux/slices/userSlice";
import useGSDispatch from "@/redux/useGSDispatch";
import { AiFillHome, AiTwotoneSetting } from "react-icons/ai";
import {
  RiChatUploadFill,
  RiCompassDiscoverFill,
  RiPlayListFill,
} from "react-icons/ri";
import { MdDashboard, MdRecommend } from "react-icons/md";

function NavLink({ to, activeClassName, inactiveClassName, ...rest }) {
  const location = useLocation();

  let isActive =
    location.pathname === to || location.pathname.startsWith(`/${to}`);
  return (
    <Link
      className={isActive ? ` ${activeClassName}` : ` ${inactiveClassName}`}
      to={to}
      {...rest}
    />
  );
}

function SidebarLeft({ role, setClickUpload }) {
  const dispatch = useGSDispatch();
  const navigate = useNavigate();

  const logoutHandler = function () {
    dispatch(resetLogin());
    navigate("/login");
  };
  return (
    <div className="left-sidebar child-scroll">
      <div className="logo">
        <Link to={"/"} id="home">
          <FaMusic className="logo__music" />
          <div className="logo__text">
            <span className="logo__primary">Geet</span>Sunam
          </div>
        </Link>
      </div>
      {/* ____________________________________Menu____________________________________  */}
      <div className="menu-list">
        <div className="menu-data">
          <div className="menu-head">Menu</div>
          <ul>
            <NavLink to="home" activeClassName="active">
              <li className="submenus">
                <span className="menu-icon">
                  <AiFillHome className="icons" />
                </span>
                <span className="menu-text">Home</span>
              </li>
            </NavLink>

            <NavLink to="trends" activeClassName="active">
              <li className="submenus">
                <span className="menu-icon">
                  <FiTrendingUp className="icons" />
                </span>
                <span className="menu-text">Trending</span>
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
      {/* ____________________________________Discover____________________________________  */}
      <div className="menu-list">
        <div className="menu-data">
          <div className="menu-head">Discover</div>
          <ul>
            <NavLink to="explore" activeClassName="active">
              <li className="submenus">
                <span className="menu-icon">
                  <RiCompassDiscoverFill className="icons" />
                </span>
                <span className="menu-text">Explore</span>
              </li>
            </NavLink>

            <NavLink to="releases" activeClassName="active">
              <li className="submenus">
                <span className="menu-icon">
                  <FiMusic className="icons" />
                </span>
                <span className="menu-text">New Releases</span>
              </li>
            </NavLink>

            <NavLink to="recommendation" activeClassName="active">
              <li className="submenus">
                <span className="menu-icon">
                  <MdRecommend className="icons" />
                </span>
                <span className="menu-text">Made for You</span>
              </li>
            </NavLink>

            <NavLink to="artists" activeClassName="active">
              <li className="submenus">
                <span className="menu-icon">
                  <FaUserShield className="icons" />
                </span>
                <span className="menu-text">Artists</span>
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
      {/* ____________________________________Dashboard____________________________________  */}
      {role === "artists" && (
        <div className="menu-list">
          <div className="menu-data">
            <div className="menu-head">Dashboard</div>
            <ul>
              <NavLink to="trends" activeClassName="active">
                <li className="submenus">
                  <span className="menu-icon">
                    <MdDashboard className="icons" />
                  </span>
                  <span className="menu-text">Dashboard</span>
                </li>
              </NavLink>
              <li className="submenus" onClick={() => setClickUpload(true)}>
                <span className="menu-icon">
                  <RiChatUploadFill className="icons" />
                </span>
                <span className="menu-text">Upload Songs</span>
              </li>
            </ul>
          </div>
        </div>
      )}
      {/* ____________________________________Your Collection____________________________________  */}
      <div className="menu-list">
        <div className="menu-data">
          <div className="menu-head">Your Collection</div>
          <ul>
            <NavLink to="likedsongs" activeClassName="active">
              <li className="submenus">
                <span className="menu-icon">
                  <FiHeart className="icons" />
                </span>
                <span className="menu-text">Liked Songs</span>
              </li>
            </NavLink>

            <NavLink to="fav-artists" activeClassName="active">
              <li className="submenus">
                <span className="menu-icon">
                  <FaUserShield className="icons" />
                </span>
                <span className="menu-text">Favourite Artists</span>
              </li>
            </NavLink>

            <NavLink to="playlists" activeClassName="active">
              <li className="submenus">
                <span className="menu-icon">
                  <RiPlayListFill className="icons" />
                </span>
                <span className="menu-text">Playlists</span>
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
      {/* ____________________________________General____________________________________  */}
      <div className="menu-list">
        <div className="menu-data">
          <div className="menu-head">General</div>
          <ul>
            <NavLink to="settings" activeClassName="active">
              <li className="submenus">
                <span className="menu-icon">
                  <AiTwotoneSetting className="icons" />
                </span>
                <span className="menu-text">Settings</span>
              </li>
            </NavLink>

            <li
              className="submenus"
              style={{ marginBottom: 20 }}
              onClick={logoutHandler}>
              <span className="menu-icon">
                <FiLogOut className="icons" />
              </span>
              <span className="menu-text">Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SidebarLeft;
