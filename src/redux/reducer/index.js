import { combineReducers } from "@reduxjs/toolkit";
import errors from "./error";
import messages from "./messages";
import success from "./success";
import userReducer from "../slices/userSlice";

export default combineReducers({
  errors,
  success,
  messages,
  userState: userReducer,
});
