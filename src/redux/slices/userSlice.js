import { createSlice } from "@reduxjs/toolkit";

import { loginUserThunk } from "redux/middlewares/loginUserThunk";
import { getUserData, isUserLogin, resetLoginData } from "utils/storage.utils";

const initialState = {
  userData: getUserData() || {},
  loginStatus: isUserLogin() || false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetLogin: (state) => {
      resetLoginData();
      state.userData = "";
      state.loginStatus = false;
    },
  },
  extraReducers: {
    [loginUserThunk.fulfilled]: (state, { payload }) => {
      state.userData = payload?.data?.user;
      state.loginStatus = true;
    },
    [loginUserThunk.rejected]: (state, { payload }) => {
      state.userData = "";
      state.loginStatus = false;
    },
    [loginUserThunk.pending]: (state) => {
      state.userData = "";
      state.loginStatus = false;
    },
  },
});

export const { resetLogin } = userSlice.actions;
export default userSlice.reducer;
