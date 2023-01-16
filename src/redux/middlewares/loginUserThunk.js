import { createAsyncThunk } from "@reduxjs/toolkit";
import userLoginApi from "services/authApi/login.api";
import googleLoginApi from "services/authApi/googleLogin.api";
import { setUserLogin } from "utils/storage.utils";

export const loginUserThunk = createAsyncThunk(
  "users/login",
  async ({ email, password, isRememberMe }, thunkAPI) => {
    try {
      const response = await userLoginApi({ email, password });
      if (response) {
        response.isRememberMe = isRememberMe;
        setUserLogin(response);
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(null);
    }
  }
);

export const googleLoginUserThunk = createAsyncThunk(
  "users/login",
  async ({ googleAccessToken }, thunkAPI) => {
    try {
      const response = await googleLoginApi({ googleAccessToken });
      if (response) {
        response.isRememberMe = true;

        setUserLogin(response);
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(null);
    }
  }
);
