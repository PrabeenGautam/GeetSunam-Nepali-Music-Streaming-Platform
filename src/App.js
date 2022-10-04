import "./App.css";
import { SidebarLeft, SidebarRight } from "components/Sidebar";
import Content from "components/Content";
import { Routes, Route } from "react-router-dom";
import Trends from "pages/trends/trends";
import Explore from "pages/explore/explore";
import MainPlayer from "components/Player/Player";
import NewReleases from "pages/NewReleases";
import Recommnedations from "pages/Recommendations";
import LikedSongs from "pages/LikedSongs/LikedSongs";
import FavouriteArtists from "pages/FavouriteArtists/FavouriteArtists";
import PlaylistSection from "pages/Playlists/PlaylistSection";
import Settings from "pages/Settings/settings";
import PlaylistsDetails from "pages/Playlists/PlaylistsDetails";
import ArtistsDetails from "components/Artists/ArtistsDetails";

function App() {
  return (
    <>
      <div className="main-container">
        <div>
          <SidebarLeft />
          <div className="content">
            <Routes>
              <Route path="/" element={<Content />} />
              <Route path="/trends" element={<Trends />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/releases" element={<NewReleases />} />
              <Route path="/recommendation" element={<Recommnedations />} />
              <Route path="/likedsongs" element={<LikedSongs />} />
              <Route path="/artists" element={<FavouriteArtists />} />
              <Route path="/artists/:id" element={<ArtistsDetails />} />
              <Route path="/playlists" element={<PlaylistSection />} />
              <Route path="/playlists/:id" element={<PlaylistsDetails />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>

          <div className="right-sidebar">
            <SidebarRight />
          </div>
        </div>
        <div className="player">
          <MainPlayer />
        </div>
      </div>
    </>
  );
}

export default App;
