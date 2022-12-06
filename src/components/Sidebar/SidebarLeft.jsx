import { Link, useLocation } from "react-router-dom";
import { FaMusic } from "react-icons/fa";

import sidebarMenu from "./sidebarMenu.data";

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

  if (!artistsDashboard && menuLastLink === "upload") {
    sidebarMenu[0].menus.pop();
  }
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
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SidebarLeft;
