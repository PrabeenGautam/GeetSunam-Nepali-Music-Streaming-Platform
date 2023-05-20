import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaMusic, FaUserShield } from "react-icons/fa";
import { FiHeart, FiLogOut, FiMusic, FiTrendingUp } from "react-icons/fi";

import { AiFillHome, AiTwotoneSetting } from "react-icons/ai";
import {
  RiChatUploadFill,
  RiCompassDiscoverFill,
  RiPlayListFill,
} from "react-icons/ri";
import { MdDashboard, MdLibraryMusic, MdRecommend } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";

import { resetLogin } from "@/redux/slices/userSlice";
import useGSDispatch from "@/redux/useGSDispatch";
import ActionCreators from "@/react-mui-player/redux/actionCreators";
import { updatePlayState } from "@/utils/playerState.utils";
import { getToken } from "@/utils/storage.utils";
import Logo from "./Logo";

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

function SidebarLeft({
  role,
  setClickUpload,
  handleSideBar,
  showGenre = false,
}) {
  const dispatchGS = useGSDispatch();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = getToken();

  const { t } = useTranslation("translation", {
    keyPrefix: "leftSideBar",
  });

  const logoutHandler = function () {
    dispatch(ActionCreators.stop());
    updatePlayState(token);
    queryClient.removeQueries();
    dispatchGS(resetLogin());
    navigate("/login");
  };
  return (
    <div className="left-sidebar child-scroll">
      <Logo />
      {/* ____________________________________Menu____________________________________  */}
      <div className="menu-list">
        <div className="menu-data">
          <div className="menu-head">{t("menu")}</div>
          <ul>
            <NavLink to="home" activeClassName="active">
              <li className="submenus">
                <span className="menu-icon">
                  <AiFillHome className="icons" />
                </span>
                <span className="menu-text">{t("home")}</span>
              </li>
            </NavLink>

            <NavLink to="trends" activeClassName="active">
              <li className="submenus">
                <span className="menu-icon">
                  <FiTrendingUp className="icons" />
                </span>
                <span className="menu-text">{t("trending")}</span>
              </li>
            </NavLink>

            <NavLink
              to="genre"
              activeClassName="active"
              className="genre-sidebar">
              <li className="submenus">
                <span className="menu-icon">
                  <MdLibraryMusic className="icons" />
                </span>
                <span className="menu-text">{t("genre")}</span>
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
      {/* ____________________________________Discover____________________________________  */}
      <div className="menu-list">
        <div className="menu-data">
          <div className="menu-head">{t("discover")}</div>
          <ul>
            <NavLink to="explore" activeClassName="active">
              <li className="submenus">
                <span className="menu-icon">
                  <RiCompassDiscoverFill className="icons" />
                </span>
                <span className="menu-text">{t("explore")}</span>
              </li>
            </NavLink>

            <NavLink to="releases" activeClassName="active">
              <li className="submenus">
                <span className="menu-icon">
                  <FiMusic className="icons" />
                </span>
                <span className="menu-text">{t("newReleases")}</span>
              </li>
            </NavLink>

            <NavLink to="recommendation" activeClassName="active">
              <li className="submenus">
                <span className="menu-icon">
                  <MdRecommend className="icons" />
                </span>
                <span className="menu-text">{t("madeForYou")}</span>
              </li>
            </NavLink>

            <NavLink to="artists" activeClassName="active">
              <li className="submenus">
                <span className="menu-icon">
                  <FaUserShield className="icons" />
                </span>
                <span className="menu-text">{t("artists")}</span>
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
      {/* ____________________________________Dashboard____________________________________  */}
      {role === "artists" && (
        <div className="menu-list">
          <div className="menu-data">
            <div className="menu-head">{t("dashboard")}</div>
            <ul>
              <NavLink to="dashboard" activeClassName="active">
                <li className="submenus">
                  <span className="menu-icon">
                    <MdDashboard className="icons" />
                  </span>
                  <span className="menu-text">{t("manageSongs")}</span>
                </li>
              </NavLink>
              <li
                className="submenus"
                onClick={() => {
                  setClickUpload(true);
                  window.innerWidth <= 900 && handleSideBar(true);
                }}>
                <span className="menu-icon">
                  <RiChatUploadFill className="icons" />
                </span>
                <span className="menu-text">{t("uploadSongs")}</span>
              </li>
            </ul>
          </div>
        </div>
      )}
      {/* ____________________________________Your Collection____________________________________  */}
      <div className="menu-list">
        <div className="menu-data">
          <div className="menu-head">{t("yourCollection")}</div>
          <ul>
            <NavLink to="likedsongs" activeClassName="active">
              <li className="submenus">
                <span className="menu-icon">
                  <FiHeart className="icons" />
                </span>
                <span className="menu-text">{t("likedSongs")}</span>
              </li>
            </NavLink>

            <NavLink to="fav-artists" activeClassName="active">
              <li className="submenus">
                <span className="menu-icon">
                  <FaUserShield className="icons" />
                </span>
                <span className="menu-text">{t("favouriteArtists")}</span>
              </li>
            </NavLink>

            <NavLink to="playlists" activeClassName="active">
              <li className="submenus">
                <span className="menu-icon">
                  <RiPlayListFill className="icons" />
                </span>
                <span className="menu-text">{t("playlists")}</span>
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
      {/* ____________________________________General____________________________________  */}
      <div className="menu-list">
        <div className="menu-data">
          <div className="menu-head">{t("general")}</div>
          <ul>
            <NavLink to="settings" activeClassName="active">
              <li className="submenus">
                <span className="menu-icon">
                  <AiTwotoneSetting className="icons" />
                </span>
                <span className="menu-text">{t("settings")}</span>
              </li>
            </NavLink>

            <li
              className="submenus"
              style={{ marginBottom: 20 }}
              onClick={logoutHandler}>
              <span className="menu-icon">
                <FiLogOut className="icons" />
              </span>
              <span className="menu-text">{t("logout")}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SidebarLeft;
