import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import { SidebarLeft, SidebarRight } from "@/components/Sidebar";
import MainPlayer from "@/components/Player/Player";
import ProtectedRoute from "@/utils/protectedRoutes";
import Content from "@/components/Content";

import SearchPages from "@/pages/search/SearchPage";
import SearchSongs from "@/pages/search/SearchSongs";
import SearchArtists from "@/pages/search/SearchArtists";
import SearchPlaylists from "@/pages/search/SearchPlaylists";

// const Content = React.lazy(() => import("components/Content"));
const Trends = React.lazy(() => import("@/pages/trends/trends"));
const Explore = React.lazy(() => import("@/pages/explore/explore"));
const NewReleases = React.lazy(() => import("@/pages/NewReleases"));
const Recommnedations = React.lazy(() => import("@/pages/Recommendations"));
const LikedSongs = React.lazy(() => import("@/pages/LikedSongs/LikedSongs"));
const FavouriteArtists = React.lazy(() =>
  import("@/pages/Artists/FavouriteArtists")
);
const PlaylistSection = React.lazy(() =>
  import("@/pages/Playlists/PlaylistSection")
);
const Settings = React.lazy(() => import("@/pages/Settings/settings"));
const PlaylistsDetails = React.lazy(() =>
  import("@/pages/Playlists/PlaylistsDetails")
);
const ArtistsDetails = React.lazy(() =>
  import("@/components/Artists/ArtistsDetails")
);
const Artists = React.lazy(() => import("@/pages/Artists/Artists"));
const GenreContainer = React.lazy(() => import("@/pages/genre/GenreContainer"));

function App() {
  const [artistsDashboard, setDashBoard] = useState(false);
  return (
    <ProtectedRoute setDashBoard={setDashBoard}>
      <div className="main-container">
        <div>
          <SidebarLeft artistsDashboard={artistsDashboard} />
          <div className="content">
            <Routes>
              <Route path="/home" element={<Content />} />
              <Route path="/" element={<Navigate replace to="/home" />} />
              <Route path="/trends" element={<Trends />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/releases" element={<NewReleases />} />
              <Route path="/recommendation" element={<Recommnedations />} />
              <Route path="/likedsongs" element={<LikedSongs />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/artists/:id" element={<ArtistsDetails />} />
              <Route path="/fav-artists" element={<FavouriteArtists />} />
              <Route path="/playlists" element={<PlaylistSection />} />
              <Route path="/playlists/:id" element={<PlaylistsDetails />} />

              {/* Redirect Since Genre List is shown in Sidebar*/}
              <Route path="/*" element={<Navigate replace to="/" />} />
              <Route path="/genre/:id" element={<GenreContainer />} />
              <Route path="/results" element={<SearchPages />} />
              <Route path="/results/artists" element={<SearchArtists />} />
              <Route path="/results/songs" element={<SearchSongs />} />
              <Route path="/results/playlists" element={<SearchPlaylists />} />

              <Route path="/settings" element={<Settings />} />
              {artistsDashboard && (
                <Route path="/upload" element={<Content />} />
              )}
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
    </ProtectedRoute>
  );
}

export default App;
