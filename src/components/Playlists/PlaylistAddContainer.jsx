import { Checkbox } from "@mui/material";
import { BiPlusCircle } from "react-icons/bi";
import { GiTireIronCross } from "react-icons/gi";

function PlaylistAddContainer({ setClick }) {
  const playlistHandler = (e) => {
    console.log(e.target.id);
    // alert(`Added to Playlist`)
  };
  return (
    <>
      <div>
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
            {[1, 1, 1, 1, 1, 1, 1].map((value, index) => (
              <div
                key={index}
                className="playlist-container"
                style={{ cursor: "pointer" }}
                id={index}>
                <Checkbox sx={{ color: "white" }} />
                <span style={{ verticalAlign: "middle" }}>Playlist 1</span>
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
