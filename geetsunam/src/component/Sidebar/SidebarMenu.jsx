import React from "react";
import * as AIIcons from "react-icons/ai";
import * as FIIcons from "react-icons/fi";
import * as RIIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";

import PopImage from "../../assets/genre/Pop.jpg";
import Dohori from "../../assets/genre/dohori.jpg";
import Teej from "../../assets/genre/teej.png";
import Placeholder from "../../assets/genre/placeholder-image.jpg";

export const sidebarMenu = [
  {
    title: "Menu",
    menus: [
      {
        icons: <AIIcons.AiFillHome className="icons" />,
        text: "Home",
        link: "/",
      },
      {
        icons: <FIIcons.FiTrendingUp className="icons" />,
        text: "Trends",
        link: "trends",
      },
      // {
      //   icons: <FIIcons.FiMusic className="icons" />,
      //   text: "Library",
      //   link: "library",
      // },
      {
        icons: <RIIcons.RiCompassDiscoverFill className="icons" />,
        text: "Explore",
        link: "explore",
      },
    ],
  },

  {
    title: "Your Collection",
    menus: [
      {
        icons: <FIIcons.FiHeart className="icons" />,
        text: "Liked Songs",
        link: "likedsongs",
      },
      {
        icons: <FaIcons.FaUserShield className="icons" />,
        text: "Favourite Artists",
        link: "artists",
      },
      // {
      //   icons: <AIIcons.AiFillFolder className="icons" />,
      //   text: "Local",
      //   link: "local",
      // },
      {
        icons: <RIIcons.RiPlayListFill className="icons" />,
        text: "Playlists",
        link: "playlists",
      },
    ],
  },
  {
    title: "General",
    menus: [
      {
        icons: <AIIcons.AiTwotoneSetting className="icons" />,
        text: "Settings",
        link: "settings",
      },
      {
        icons: <FIIcons.FiLogOut className="icons" />,
        text: "Log Out",
        link: "/logout",
      },
    ],
  },
];

export const genreMenu = [
  {
    image: PopImage,
    name: "Pop",
    alt: "pop",
    link: "genre/pop",
  },
  {
    image: Placeholder,
    name: "Classical",
    alt: "classical",
    link: "genre/classical",
  },
  {
    image: Placeholder,
    name: "Rock",
    alt: "rock",
    link: "genre/rock",
  },
  {
    image: Dohori,
    name: "Dohori",
    alt: "dohori",
    link: "genre/dohori",
  },
  {
    image: Teej,
    name: "Teej",
    alt: "teej",
    link: "genre/teej",
  },
  {
    image: Placeholder,
    name: "Adhunik",
    alt: "adhunik",
    link: "genre/adhunik",
  },
  {
    image: Placeholder,
    name: "Gajal",
    alt: "gajal",
    link: "genre/gajal",
  },
  {
    image: Placeholder,
    name: "Hiphop",
    alt: "hiphop",
    link: "genre/hiphop",
  },
];
