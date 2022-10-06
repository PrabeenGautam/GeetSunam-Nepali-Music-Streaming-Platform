import React from "react";
import Player from "react-mui-player/components/Player";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";
const theme = createTheme({
  palette: {
    primary: {
      main: "#f96666",
    },
    secondary: {
      main: green[500],
    },
    background: {
      paper: "#222831",
    },
    action: {
      active: "#fff",
      hover: "rgba(255, 255, 255, 0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(255, 255, 255, 0.16)",
      selectedOpacity: 0.16,
    },
    text: {
      disabled: "rgba(255, 255, 255, 0.5)",
      icon: "rgba(255, 255, 255, 0.5)",
      primary: "#fff",
      secondary: "#AAB4BE",
    },
  },
});

function MainPlayer() {
  return (
    <>
      {
        <ThemeProvider theme={theme}>
          <Player sx={{ borderTop: `1px solid #eeeeee` }} />
        </ThemeProvider>
      }
    </>
  );
}
export default MainPlayer;
