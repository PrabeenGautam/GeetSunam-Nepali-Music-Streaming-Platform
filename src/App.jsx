import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
import Recommendations from "@/pages/Recommendations";
import LikedSongs from "@/pages/LikedSongs/LikedSongs";
import FavouriteArtists from "@/pages/Artists/FavouriteArtists";
import PlaylistSection from "@/pages/Playlists/PlaylistSection";
import Settings from "@/pages/Settings/settings";
import PlaylistsDetails from "@/pages/Playlists/PlaylistsDetails";
import ArtistsDetails from "@/components/Artists/ArtistsDetails";
import Artists from "@/pages/Artists/Artists";
import GenreContainer from "@/pages/genre/GenreContainer";
import Navbar from "./components/Navbar/Navbar";
import SongDetails from "@/pages/SongDetails";
import {
  getPlayerLocalState,
  storePlayerState,
  updatePlayState,
} from "./utils/playerState.utils";
import UploadModel from "./components/Upload/uploadModel";
import useGSSelector from "@/redux/useGSSelector";
import Dashboard from "./pages/Artists/Dashboard";
import EditSongDetails from "./pages/Artists/EditSongsDetails";
import { postUserPlayHistory } from "./services/playerState/playerState";
import { getToken } from "./utils/storage.utils";
import { useQueryClient } from "react-query";

function App() {
  const [sidebar, setSideBar] = useState(false);
  const [clickUpload, setClickUpload] = useState(false);
  const token = getToken();

  const elementRef = useRef();
  const previousState = useRef({ totalSecondPlayed: 0 });
  const queryClient = useQueryClient();

  const playerState = useSelector((state) => state);
  const currentTime = useSelector((state) => state.currentTime);
  const userRole = useGSSelector((state) => state?.userState?.userData?.role);

  const columnCountLookup = [
    [1010, 6],
    [850, 5],
    [650, 4],
    [550, 3],
    [400, 2],
    [0, 1],
  ];

  const handleSideBar = function () {
    setSideBar((prev) => !prev);
  };

  // Run once to get initial player state
  useEffect(() => {
    getPlayerLocalState();

    // Send Api call to store playerstate
    window.addEventListener("beforeunload", function () {
      updatePlayState(token);
    });
    return () => {
      window.removeEventListener("beforeunload", function () {
        updatePlayState(token);
      });
    };
  }, []);

  // Store the player state locally
  useEffect(() => {
    storePlayerState(playerState);
  }, [playerState]);

  // Storing Play History of the user
  useEffect(() => {
    const { trackID, currentTime } = playerState;
    const {
      totalSecondPlayed,
      currentTime: prevCurrentTime,
      trackID: prevTrackID,
    } = previousState.current;

    // stop updating totalSecondPlayed of same song, if totalSecondPlayed > 10
    if (totalSecondPlayed > 10 && prevTrackID === trackID) {
      return;
    }

    // Check if track is changed - reset totalSecondPlayed
    if (prevTrackID !== trackID) {
      previousState.current.totalSecondPlayed = 0;
    }

    //If song is not seeked, there will be a second difference in currentTime
    const secondDelay = currentTime - prevCurrentTime;

    // Check 10 seconds delay
    if (
      totalSecondPlayed === 10 &&
      import.meta.env.VITE_ENVIRONMENT === "production"
    ) {
      postUserPlayHistory(prevTrackID, queryClient);
    }

    // Count each seconds, a song is listened
    if (secondDelay === 1) {
      previousState.current.totalSecondPlayed = totalSecondPlayed + 1;
    }

    previousState.current = {
      ...previousState.current,
      ...playerState,
    };
  }, [currentTime]);

  useEffect(() => {
    const handleSize = () => {
      if (elementRef) {
        const width = elementRef?.current?.offsetWidth;
        const columnCount = columnCountLookup.find(
          ([minWidth]) => width > minWidth
        )?.[1];

        document.documentElement.style.setProperty(
          "--column-count",
          columnCount
        );
      }
    };
    // Run initially
    handleSize();

    // Run on Size
    window.addEventListener("resize", handleSize);

    return () => window.removeEventListener("resize", handleSize);
  }, []);

  return (
    <ProtectedRoute>
      <div className={`main-container ${sidebar ? "toggle" : ""}`}>
        <div>
          <SidebarLeft setClickUpload={setClickUpload} role={userRole} />
          <div className="content" ref={elementRef}>
            <Navbar
              handleSideBar={handleSideBar}
              setClickUpload={setClickUpload}
            />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/home" element={<Content />} />
              <Route path="/" element={<Navigate replace to="/home" />} />
              <Route path="/trends" element={<Trends />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/releases" element={<NewReleases />} />
              <Route path="/recommendation" element={<Recommendations />} />
              <Route path="/likedsongs" element={<LikedSongs />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/artists/:id" element={<ArtistsDetails />} />
              <Route path="/fav-artists" element={<FavouriteArtists />} />
              <Route path="/playlists" element={<PlaylistSection />} />
              <Route path="/playlists/:id" element={<PlaylistsDetails />} />
              <Route path="/songs/:id" element={<SongDetails />} />
              <Route path="/users/song/:id" element={<EditSongDetails />} />

              {/* Redirect Since Genre List is shown in Sidebar*/}
              <Route path="/*" element={<Navigate replace to="/" />} />
              <Route path="/genre/:id" element={<GenreContainer />} />
              <Route path="/results" element={<SearchPages />} />
              <Route path="/results/artists" element={<SearchArtists />} />
              <Route path="/results/songs" element={<SearchSongs />} />
              <Route path="/results/playlists" element={<SearchPlaylists />} />

              <Route path="/settings" element={<Settings />} />
            </Routes>
            {clickUpload && <UploadModel setClickUpload={setClickUpload} />}
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
