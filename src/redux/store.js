import { configureStore } from "@reduxjs/toolkit";

import userReducer from "redux/slices/userSlice";

const geetSunamStore = configureStore({
  reducer: {
    userState: userReducer,
  },
  devTools: true,
});
export default geetSunamStore;
