import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaMusic } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

import sidebarMenu from "./sidebarMenu.data";
import { resetLogin } from "@/redux/slices/userSlice";
import useGSDispatch from "@/redux/useGSDispatch";

function NavLink({ to, activeClassName, inactiveClassName, ...rest }) {
  const location = useLocation();
  let isActive =
    location.pathname === to || location.pathname.includes(`/${to}`);
  return (
    <Link
      className={isActive ? ` ${activeClassName}` : ` ${inactiveClassName}`}
      to={to}
      {...rest}
    />
  );
}

function SidebarLeft({ artistsDashboard }) {
  const menuLastLink =
    sidebarMenu[0].menus[sidebarMenu[0].menus.length - 1].link;
  if (artistsDashboard && menuLastLink !== "upload") {
    sidebarMenu[0].menus.push({
      icons: <FaMusic className="icons" />,
      text: "Upload",
      link: "upload",
    });
  }

  const dispatch = useGSDispatch();
  const navigate = useNavigate();

  if (!artistsDashboard && menuLastLink === "upload") {
    sidebarMenu[0].menus.pop();
  }

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
      <div className="menu-list">
        {sidebarMenu.map((value, index) => {
          return (
            <div className="menu-data" key={index}>
              <div className="menu-head">{value.title}</div>
              <ul>
                {value.menus.map((d, index) => {
                  return (
                    <NavLink
                      to={d.link}
                      key={index}
                      activeClassName="active"
                      inactiveClassName="">
                      <li className="submenus">
                        <span className="menu-icon">{d.icons}</span>
                        <span className="menu-text">{d.text}</span>
                      </li>
                    </NavLink>
                  );
                })}
                {value.title === "General" && (
                  <li
                    className="submenus"
                    style={{ marginBottom: 20 }}
                    onClick={logoutHandler}>
                    <span className="menu-icon">
                      <FiLogOut className="icons" />
                    </span>
                    <span className="menu-text">Logout</span>
                  </li>
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SidebarLeft;
