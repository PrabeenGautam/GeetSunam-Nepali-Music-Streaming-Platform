import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducer/index";

const geetSunamStore = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.NODE_ENV !== "production",
});
export default geetSunamStore;
