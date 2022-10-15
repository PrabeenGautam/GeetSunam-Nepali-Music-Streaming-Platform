import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import actionCreators from "../redux/actionCreators";

import { Slider, IconButton, Popover } from "@mui/material";
import {
  VolumeUp,
  RemoveCircle,
  VolumeOff,
  VolumeMute,
  AddCircle,
  VolumeDown,
} from "@mui/icons-material";

import withoutPropagation from "../utils/withoutPropagation";
import { Box } from "@mui/system";

export default function VolumeControl() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const id = open ? "simple-popover" : undefined;

  const dispatch = useDispatch();
  const onVolumeChange = (value) =>
    dispatch(actionCreators.changeVolume(value));

  const value = useSelector(
    /**@type {import("../redux/types").useSelectCb} */
    (state) => state.volume
  );

  const handleSliderChange = (event, newValue) => {
    onVolumeChange(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        className="children"
        title="Change Volume"
        size="large"
        aria-describedby={id}
        onClick={handleClick}>
        {value === 0 ? (
          <VolumeOff />
        ) : value < 50 ? (
          <VolumeDown />
        ) : (
          <VolumeUp />
        )}
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}>
        <Box sx={{ bgcolor: "rgba(0,0,0,0.8)" }} className="volume-popover">
          <div
            className="children"
            style={{ marginTop: 10, cursor: "pointer" }}
            title="Increase Volume"
            onClick={withoutPropagation(
              onVolumeChange,
              value > 90 ? 100 : value + 10
            )}
            size="large">
            <AddCircle />
          </div>
          <Slider
            className="children"
            value={value}
            orientation="vertical"
            sx={[
              { height: 140, color: "white" },
              {
                "&:hover": {
                  color: "var(--highlight)",
                },
              },
            ]}
            valueLabelDisplay="auto"
            aria-labelledby="continuous-slider"
            onChange={handleSliderChange}
          />

          <div
            style={{ marginBottom: 10, marginTop: 5, cursor: "pointer" }}
            className="children"
            title="Reduce Volume"
            onClick={withoutPropagation(
              onVolumeChange,
              value < 10 ? 0 : value - 10
            )}
            size="large">
            <RemoveCircle />
          </div>
        </Box>
      </Popover>
    </div>
  );
}
