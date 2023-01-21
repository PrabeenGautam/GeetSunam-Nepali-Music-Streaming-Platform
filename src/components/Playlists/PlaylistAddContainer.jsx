import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { BiPlusCircle } from "react-icons/bi";
import { MdClose, MdPublic } from "react-icons/md";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";

import {
  addSongsToPlaylist,
  createPlaylistsAPI,
  getPlaylistsAPI,
  removeSongsFromPlaylists,
} from "@/services/playlistApi/getPlaylist.api";

function PlaylistAddContainer({ setClick, data }) {
  const [playlists, setPlaylist] = useState(null);
  const [checkCreated, setCheckCreated] = useState(null);
  let songHandled = false;

  const songId = data._id || data;

  useEffect(() => {
    const fetchPlaylists = async () => {
      const playlists = await getPlaylistsAPI();
      setPlaylist(playlists.data.playlists);
    };

    fetchPlaylists();
  }, [checkCreated]);

  const createPlaylist = async () => {
    const response = await createPlaylistsAPI();
    if (response.data) {
      setCheckCreated((prev) => !prev);
      toast.success("Playlist Created Succesfully", { autoClose: 3000 });
    }
  };

  const hasAlreadySongs = (playlist) => {
    const playlistSongsId = playlist.songs.map((song) => String(song._id));
    return playlistSongsId.includes(songId);
  };

  const handleSaveToPlaylists = async (playlist, event) => {
    const playlistId = playlist._id;
    const checked = event.target.checked;
    if (!songHandled) {
      songHandled = true;

      if (checked) {
        const response = await addSongsToPlaylist(songId, playlistId);
        if (response.status === "success") {
          toast.success(`Added to ${playlist.title}`, {
            autoClose: 2000,
          });
        }
      } else {
        const response = await removeSongsFromPlaylists(songId, playlistId);
        if (response.status === "success") {
          toast.success(`Remove from ${playlist.title}`, {
            autoClose: 2000,
          });
        }
      }

      songHandled = false;
    }
  };

  return (
    playlists && (
      <div className="model">
        <div
          className="model-container"
          onClick={() => {
            setClick(false);
          }}></div>
        <div className="container" style={{ width: "17rem", zIndex: 9999 }}>
          <div
            className="header"
            style={{
              borderBottom: "0.5px solid var(--divider)",
              paddingBottom: 10,
            }}>
            <div>Save too...</div>
            <MdClose
              style={{ cursor: "pointer", width: 25, height: 25 }}
              onClick={() => setClick(false)}
            />
          </div>

          <div
            className="playlist-section child-scroll"
            style={{
              marginBottom: 20,
              overflowY: "auto",
              maxHeight: "15rem",
            }}>
            {playlists.map((playlist, index) => (
              <div
                key={playlist._id}
                className="playlist-container"
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  margin: "15px 0",
                }}
                id={`playlist-${index}`}>
                <input
                  type="checkbox"
                  style={{ width: 20, height: 20, marginRight: 10 }}
                  name="checkPlaylist"
                  id={playlist._id}
                  defaultChecked={hasAlreadySongs(playlist)}
                  onChange={(e) => handleSaveToPlaylists(playlist, e)}
                />

                <label
                  htmlFor={playlist._id}
                  style={{
                    verticalAlign: "middle",
                    width: "100%",
                    cursor: "pointer",
                    wordBreak: "break-all",
                  }}>
                  {playlist.title}
                </label>

                <div
                  style={{
                    marginLeft: 10,
                    display: "flex",
                    alignItems: "center",
                  }}>
                  {playlist.public ? (
                    <MdPublic style={{ fontSize: "1.2rem" }} />
                  ) : (
                    <RiGitRepositoryPrivateLine
                      style={{ fontSize: "1.2rem" }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div
            onClick={createPlaylist}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              cursor: "pointer",
              borderTop: "0.5px solid var(--divider)",
              paddingTop: "20px",
            }}>
            <BiPlusCircle style={{ cursor: "pointer", fontSize: "1.5rem" }} />
            <span>Create New Playlist...</span>
          </div>
        </div>
      </div>
    )
  );
}

export default PlaylistAddContainer;
