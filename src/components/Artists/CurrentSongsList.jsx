import { FiClock, FiTrash } from "react-icons/fi";
import useCurrentSong from "@/hooks/useCurrentSong";
import ManageCurrentPlayback from "../PlayerBack/manageCurrentPlayback";
import { BiLock } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";

function CurrentSongsList({ data, setDeleteSong, editHandler }) {
  const currentSong = useCurrentSong();

  const musicList =
    data &&
    data.map(({ trackDetails }) => ({
      ID: trackDetails.ID,
      coverArt: trackDetails.coverArt,
      title: trackDetails.title,
      artist: trackDetails.artist,
      source: trackDetails.source,
      favourite: trackDetails.isFavourite,
    }));

  return (
    <>
      {data?.length !== 0 ? (
        <section className="song-list">
          <div className={`recent-container current-song  list_heading `}>
            <span className="index">#</span>
            <span></span>
            <span className="song-name">name</span>
            <span className="released-date">Released</span>
            <span className="recent-genre">genre</span>
            <span className="length">
              <FiClock />
            </span>
            <span className="status">Status</span>
            <span style={{ visibility: "hidden" }}>#</span>
          </div>
          {data &&
            data.map((value) => {
              return (
                <div
                  key={value._id}
                  tabIndex="0"
                  className={`recent-container current-song   hover-effect ${
                    currentSong?.ID === value.trackDetails.ID ? "playing" : ""
                  }`}>
                  <ManageCurrentPlayback
                    song={value}
                    musicList={musicList}
                    artists={true}
                  />

                  <span className="length">{value.duration || value.time}</span>
                  <span className="flex-center status">
                    {value.public ? (
                      ""
                    ) : (
                      <BiLock style={{ fontSize: "1.1rem" }} />
                    )}
                  </span>
                  <span className="add-more" onClick={() => editHandler(value)}>
                    Edit
                  </span>

                  <FaEdit
                    className="edit-more"
                    title="Edit Songs"
                    onClick={() => editHandler(value)}
                    style={{ fill: "white" }}
                  />

                  <span className="more" onClick={() => setDeleteSong(value)}>
                    <FiTrash style={{ stroke: "white" }} title="Remove songs" />
                  </span>
                </div>
              );
            })}
        </section>
      ) : (
        <h4
          style={{
            color: "rgba(255,255,255,0.8)",
            marginTop: 20,
            marginBottom: 20,
          }}>
          No Music To Show
        </h4>
      )}
    </>
  );
}

export default CurrentSongsList;
