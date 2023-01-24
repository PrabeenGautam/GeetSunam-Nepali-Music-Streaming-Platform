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

import Trends from "@/pages/trends/trends";
import Explore from "@/pages/explore/explore";
import NewReleases from "@/pages/NewReleases";
import Recommnedations from "@/pages/Recommendations";
import LikedSongs from "@/pages/LikedSongs/LikedSongs";
import FavouriteArtists from "@/pages/Artists/FavouriteArtists";
import PlaylistSection from "@/pages/Playlists/PlaylistSection";
import Settings from "@/pages/Settings/settings";
import PlaylistsDetails from "@/pages/Playlists/PlaylistsDetails";
import ArtistsDetails from "@/components/Artists/ArtistsDetails";
import Artists from "@/pages/Artists/Artists";
import GenreContainer from "@/pages/genre/GenreContainer";
import { useRef } from "react";
import Navbar from "./components/Navbar/Navbar";
import { useEffect } from "react";

function App() {
  const [artistsDashboard, setDashBoard] = useState(false);
  const [sidebar, setSideBar] = useState(false);
  const elementRef = useRef();

  const handleSideBar = function () {
    setSideBar((prev) => !prev);
  };

  useEffect(() => {
    const handleSize = () => {
      const width = elementRef.current.offsetWidth;

      if (width > 1010) {
        document.documentElement.style.setProperty("--column-count", 6);
      } else if (width > 850 && width <= 1010) {
        document.documentElement.style.setProperty("--column-count", 5);
      } else if (width > 650 && width <= 850) {
        document.documentElement.style.setProperty("--column-count", 4);
      } else if (width > 550 && width <= 650) {
        document.documentElement.style.setProperty("--column-count", 3);
      } else if (width > 400 && width <= 550) {
        document.documentElement.style.setProperty("--column-count", 2);
      } else {
        document.documentElement.style.setProperty("--column-count", 1);
      }
    };
    // Run initially
    handleSize();

    // Run on Size
    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, []);

  return (
    <ProtectedRoute setDashBoard={setDashBoard}>
      <div className={`main-container ${sidebar ? "toggle" : ""}`}>
        <div>
          <SidebarLeft artistsDashboard={artistsDashboard} />
          <div className="content" ref={elementRef}>
            <Navbar handleSideBar={handleSideBar} />
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
