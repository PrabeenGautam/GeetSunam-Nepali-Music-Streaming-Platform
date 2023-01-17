import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "../slices/userSlice";
import playlistReducer from "../slices/playlistSlice";

export default combineReducers({
  userState: userReducer,
  playlistState: playlistReducer,
});
