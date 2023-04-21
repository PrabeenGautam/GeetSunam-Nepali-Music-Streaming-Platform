import { createSlice } from "@reduxjs/toolkit";

import {
  googleLoginUserThunk,
  loginUserThunk,
} from "@/redux/middlewares/loginUserThunk";
import {
  googleSignUpUserThunk,
  signUpUserThunk,
} from "@/redux/middlewares/signupUserThunk";
import { resetLoginData } from "@/utils/storage.copy.utils";

const initialState = {
  userData: {},
  loginStatus: false,
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
    [loginUserThunk.rejected]: (state) => {
      state.userData = "";
      state.loginStatus = false;
    },
    [loginUserThunk.pending]: (state) => {
      state.userData = "";
      state.loginStatus = false;
    },
    [googleLoginUserThunk.fulfilled]: (state, { payload }) => {
      state.userData = payload?.data?.user;
      state.loginStatus = true;
    },
    [googleLoginUserThunk.rejected]: (state) => {
      state.userData = "";
      state.loginStatus = false;
    },
    [googleLoginUserThunk.pending]: (state) => {
      state.userData = "";
      state.loginStatus = false;
    },
    [signUpUserThunk.fulfilled]: (state, { payload }) => {
      state.userData = payload?.data?.user;
      state.loginStatus = true;
    },
    [signUpUserThunk.rejected]: (state) => {
      state.userData = "";
      state.loginStatus = false;
    },
    [signUpUserThunk.pending]: (state) => {
      state.userData = "";
      state.loginStatus = false;
    },
    [googleSignUpUserThunk.fulfilled]: (state, { payload }) => {
      state.userData = payload?.data?.user;
      state.loginStatus = true;
    },
    [googleSignUpUserThunk.rejected]: (state) => {
      state.userData = "";
      state.loginStatus = false;
    },
    [googleSignUpUserThunk.pending]: (state) => {
      state.userData = "";
      state.loginStatus = false;
    },
  },
});

export const { resetLogin } = userSlice.actions;
export default userSlice.reducer;
