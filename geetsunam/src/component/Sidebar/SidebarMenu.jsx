import React from "react";
import * as AIIcons from "react-icons/ai";
import * as FIIcons from "react-icons/fi";
import * as RIIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";

export const sidebarMenu = [
  {
    title: "Menu",
    menus: [
      {
        icons: <AIIcons.AiFillHome className="icons" />,
        text: "Home",
      },
      {
        icons: <FIIcons.FiTrendingUp className="icons" />,
        text: "Trends",
      },
      {
        icons: <FIIcons.FiMusic className="icons" />,
        text: "Library",
      },
      {
        icons: <RIIcons.RiCompassDiscoverFill className="icons" />,
        text: "Discover",
      },
    ],
  },

  {
    title: "Your Collection",
    menus: [
      {
        icons: <FIIcons.FiHeart className="icons" />,
        text: "Liked Songs",
      },
      {
        icons: <FaIcons.FaUserShield className="icons" />,
        text: "Favourite Artists",
      },
      {
        icons: <AIIcons.AiFillFolder className="icons" />,
        text: "Local",
      },
      {
        icons: <RIIcons.RiPlayListFill className="icons" />,
        text: "Playlists",
      },
    ],
  },
  {
    title: "General",
    menus: [
      {
        icons: <AIIcons.AiTwotoneSetting className="icons" />,
        text: "Settings",
      },
      {
        icons: <FIIcons.FiLogOut className="icons" />,
        text: "Log Out",
      },
    ],
  },
];
