import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

export default function TrackDetails(props) {
  const navigate = useNavigate();
  const trackID = useSelector((state) => state.trackID);

  const { title, artist } = useSelector(
    /**@type {import("../redux/types").useSelectCb} */
    (state) => {
      let currentTrack = state.playlist[state.currentTrack];
      return {
        title: currentTrack.title,
        artist: currentTrack.artist,
      };
    },
    shallowEqual
  );

  const sx = props.sx;

  const handleClick = () => {
    navigate(`/songs/${trackID}`);
  };

  return (
    <Box sx={sx} onClick={handleClick}>
      {title ? (
        <div
          className="bounce"
          style={{ cursor: "pointer", width: 120 }}
          onMouseEnter={(e) => {
            e.target.classList.remove("innerText");
          }}
          onMouseLeave={(e) => {
            e.target.classList.add("innerText");
          }}>
          <Box
            sx={{
              typography: "subtitl3",
              whiteSpace: "nowrap",
            }}>
            {title}
          </Box>
        </div>
      ) : (
        <Box
          sx={{
            typography: "subtitl3",
            whiteSpace: "nowrap",
          }}>
          {""}
        </Box>
      )}

      <Box
        sx={{
          typography: "subtitle2",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}>
        {artist}
      </Box>
    </Box>
  );
}
