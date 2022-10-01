import "./App.css";
import { SidebarLeft, SidebarRight } from "components/Sidebar";
import Content from "components/Content";
import { Routes, Route } from "react-router-dom";
import Trends from "pages/trends/trends";
import Explore from "pages/explore/explore";
import MainPlayer from "components/Player/Player";
import NewReleases from "pages/NewReleases";
import Recommnedations from "pages/Recommendations";
import LikedSongs from "pages/LikedSongs";

function App() {
  return (
    <>
      <div className="grid main-container">
        <SidebarLeft />

        <div className="content">
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/releases" element={<NewReleases />} />
            <Route path="/recommendation" element={<Recommnedations />} />
            <Route path="/likedsongs" element={<LikedSongs />} />
          </Routes>
        </div>
        <div className="right-sidebar">
          <SidebarRight />
        </div>
        <div className="player">
          <MainPlayer />
        </div>
      </div>
    </>
  );
}

export default App;
