import { useRef, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { GiTireIronCross } from "react-icons/gi";

function PlaylistAddContainer({ setClick, data }) {
  let checkedMap = {};
  let checkboxRef = useRef();

  const playlist = [
    "Playlist 1",
    "Playlist 2",
    "Playlist 3",
    "Playlist 4",
    "Playlist 5",
    "Playlist 6",
  ];

  const handleChange = (obtainedId, checked) => {
    checkedMap[obtainedId] = checked === true ? "true" : "false";

    if (checked)
      alert(
        ` Data ${
          data?.trackDetails?.title || data.title
        } Added to Playlist having ID ${obtainedId}`
      );
    else
      alert(
        `Data ${
          data?.trackDetails?.title || data.title
        } Removed from Playlist having ID ${obtainedId}`
      );
  };
  return (
    <>
      <div className="model">
        <div
          className="model-container"
          onClick={() => {
            setClick(false);
          }}></div>
        <div className="container" style={{ width: "24rem", zIndex: 9999 }}>
          <div className="header">
            <h3>Save too...</h3>
            <GiTireIronCross
              style={{ cursor: "pointer" }}
              onClick={() => setClick(false)}
            />
          </div>

          <div
            className="playlist-section child-scroll"
            style={{
              marginBottom: 20,
              overflowY: "auto",
              maxHeight: "10rem",
            }}>
            {playlist.map((value, id) => (
              <div
                key={id}
                className="playlist-container"
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  height: 40,
                }}
                id={String(id)}>
                <input
                  ref={checkboxRef}
                  type="checkbox"
                  style={{ width: 20, height: 20 }}
                  onChange={(e) => {
                    handleChange(String(id), e.target.checked);
                  }}
                  name="checkPlaylist"
                  id={String(id)}
                />
                <div
                  onClick={() => {
                    checkboxRef.current.checked = true;
                  }}
                  style={{
                    verticalAlign: "middle",
                    width: "100%",
                  }}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div
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
    </>
  );
}

export default PlaylistAddContainer;
