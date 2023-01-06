import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "../slices/userSlice";

export default combineReducers({
  userState: userReducer,
});
