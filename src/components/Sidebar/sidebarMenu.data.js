import * as AIIcons from "react-icons/ai";
import * as FIIcons from "react-icons/fi";
import * as RIIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";

const sidebarMenu = [
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

export default sidebarMenu;
