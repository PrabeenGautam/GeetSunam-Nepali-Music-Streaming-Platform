import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import sidebarMenu from "./sidebarMenu.data";

function SidebarLeft() {
  return (
    <div className="left-sidebar">
      <div className="logo">
        <Link to={"/"} id="home">
          <FaIcons.FaMusic className="logo__music" />
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
                    <Link to={d.link} key={index}>
                      <li className="submenus">
                        <span className="menu-icon">{d.icons}</span>
                        <span className="menu-text">{d.text}</span>
                      </li>
                    </Link>
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
