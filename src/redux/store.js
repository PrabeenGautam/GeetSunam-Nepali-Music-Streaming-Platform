import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducer/index";

const geetSunamStore = configureStore({
  reducer: rootReducer,
  devTools: true,
});
export default geetSunamStore;
