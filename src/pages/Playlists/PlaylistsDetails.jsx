import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import DeleteModel from "@/components/Playlists/DeleteModel";
import EditPlaylistsModel from "@/components/Playlists/EditPlaylistsModal";
import RecentPlayed from "@/components/SongsList";
import { deletePlaylistAPI } from "@/services/playlistApi/getPlaylist.api";
import { trackDetails } from "@/utils/trackDetails.utils";
import { usePlaylistData } from "@/hooks/usePlaylistsData";
import { PlaylistLoader } from "@/components/Loader/LoaderComponents";
import { MdDeleteOutline, MdEditNote } from "react-icons/md";
import { useMutation } from "react-query";
import { searchSongsApi } from "@/services/searchApi/search.api";
import Spinner from "@/components/Loader/Spinner";

function PlaylistsDetails() {
  const [click, setClick] = useState(false);
  const [deleteClick, setDeleteClick] = useState(false);
  const [showData, setShowData] = useState(false);

  const { id: playlistID } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    data: playlist,
    isLoading,
    isError,
    refetch,
  } = usePlaylistData(playlistID);
  const loader = isLoading || isError;

  const {
    mutate,
    data: searchedData,
    isLoading: isSearchedLoading,
    isError: isSearchedError,
    reset: resetSearch,
  } = useMutation(
    (data) => {
      return searchSongsApi(data);
    },
    {
      onSuccess: () => {
        setShowData(true);
      },
    }
  );

  const searchedSongs = searchedData && trackDetails(searchedData.data.songs);
  const searchedLoader = isSearchedLoading || isSearchedError;

  const onSubmitValue = (e) => {
    e.preventDefault();
    if (e.target[0].value) {
      mutate(e.target[0].value);
    }
  };

  const deletePlaylists = () => {
    deletePlaylistAPI(playlist._id).then(() => {
      navigate("/playlists");
    });
  };

  useEffect(() => {
    resetSearch();
  }, [location]);

  return (
    <div className="playlist-container">
      {click && <EditPlaylistsModel setClick={setClick} playlist={playlist} />}
      {deleteClick && (
        <DeleteModel
          setClick={setDeleteClick}
          data={playlist.title}
          deleteHandler={deletePlaylists}
        />
      )}
      {!loader ? (
        <section className="playlist">
          <div className="playlist-images">
            <img src={playlist.coverArt} alt="playlist" />
          </div>

          <div className="playlist-details">
            <div>Playlist</div>
            <div>{playlist.title}</div>
            <div className="description">{playlist.description}</div>
            <div>
              <span>{playlist.createdBy.fullname}</span>
              <span style={{ fontWeight: "bold" }}>.</span>
              <span>
                {playlist.songs.length === 0 ? "No" : playlist.songs.length}{" "}
                Songs
              </span>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              right: 20,
              top: 20,
              backgroundColor: "var(--highlight)",
              padding: "4px 8px",
              color: "white",
              zIndex: 997,
              borderRadius: 4,
              fontSize: 13,
            }}>
            {playlist.public ? "Public" : "Private"}
          </div>

          <div
            style={{
              position: "absolute",
              right: 20,
              bottom: 20,
              zIndex: 999,
            }}>
            <button
              className="custom-btn"
              title="Edit Playlists"
              style={{
                marginRight: 10,
              }}
              onClick={() => setClick(true)}>
              <MdEditNote />
            </button>
            <button
              className="custom-btn btn-play"
              title="Delete Playlists"
              onClick={() => setDeleteClick(true)}>
              <MdDeleteOutline
                style={{
                  fill: "white",
                }}
              />
            </button>
          </div>
        </section>
      ) : (
        <PlaylistLoader />
      )}

      <section
        className="playlist-songs padding"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.8)" }}>
        {!loader && (
          <RecentPlayed
            removeFromPlaylist={true}
            data={trackDetails(playlist.songs)}
            playlistID={playlist._id}
          />
        )}

        <div style={{ marginBottom: 40 }}>
          <h3>Search for songs to add them</h3>
          <div style={{ width: "30rem" }}>
            <form className="search-bar" onSubmit={onSubmitValue}>
              <FiSearch className="icon-search" />
              <input
                type="text"
                className="text-input"
                placeholder="Search songs to add them to playlist"
                name="query"
                onChange={(e) => {
                  if (!e.target.value) setShowData(false);
                }}
              />
              <input type="submit" hidden />
            </form>
          </div>

          {!searchedLoader ? (
            showData && <RecentPlayed data={searchedSongs} />
          ) : (
            <Spinner />
          )}
        </div>
      </section>
    </div>
  );
}

export default PlaylistsDetails;
