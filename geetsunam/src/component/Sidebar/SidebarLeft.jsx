import React from "react";
import * as FaIcons from "react-icons/fa";
import { sidebarMenu } from "./SidebarMenu";

function SidebarLeft() {
  return (
    <div className="left-sidebar">
      <div className="logo">
        <FaIcons.FaMusic className="logo__music" />
        <div className="logo__text">
          <span className="logo__primary">Geet</span>Sunam
        </div>
      </div>
      <div className="menu-list">
        {sidebarMenu.map((value, index) => {
          return (
            <div className="menu-data" key={index}>
              <div className="menu-head">{value.title}</div>
              <ul>
                {value.menus.map((d, index) => {
                  return (
                    <li className="submenus" key={index}>
                      <span className="menu-icon">{d.icons}</span>
                      <span className="menu-text">{d.text}</span>
                    </li>
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
