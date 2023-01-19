import * as AIIcons from "react-icons/ai";
import * as FIIcons from "react-icons/fi";
import * as RIIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";

const sidebarMenu = [
  {
    title: "Menu",
    menus: [
      {
        icons: <AIIcons.AiFillHome className="icons" />,
        text: "Home",
        link: "home",
      },
      {
        icons: <FIIcons.FiTrendingUp className="icons" />,
        text: "Trending",
        link: "trends",
      },
    ],
  },

  {
    title: "Discover",
    menus: [
      {
        icons: <RIIcons.RiCompassDiscoverFill className="icons" />,
        text: "Explore",
        link: "explore",
      },
      {
        icons: <FIIcons.FiMusic className="icons" />,
        text: "New Releases",
        link: "releases",
      },
      {
        icons: <MdIcons.MdRecommend className="icons" />,
        text: "Made for You",
        link: "recommendation",
      },
      {
        icons: <FaIcons.FaUserShield className="icons" />,
        text: "Artists",
        link: "artists",
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
        link: "fav-artists",
      },
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
