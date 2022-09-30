import "./App.css";
import { SidebarLeft, SidebarRight } from "components/Sidebar";
import Content from "components/Content";
import { Routes, Route } from "react-router-dom";
import Trends from "pages/trends/trends";
import Explore from "pages/explore/explore";
import MainPlayer from "components/Player/Player";

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
