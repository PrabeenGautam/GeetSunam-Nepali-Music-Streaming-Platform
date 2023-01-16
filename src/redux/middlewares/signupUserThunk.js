import { createAsyncThunk } from "@reduxjs/toolkit";
import { signUpApi } from "services/authApi/signup.api";
import googleLoginApi from "services/authApi/googleLogin.api";
import { setUserLogin } from "utils/storage.utils";

export const signUpUserThunk = createAsyncThunk(
  "users/signup",
  async ({ email, password, fullname, confirmPassword }, thunkAPI) => {
    try {
      const response = await signUpApi({
        email,
        password,
        fullname,
        confirmPassword,
      });
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

export const googleLoginUserThunk = createAsyncThunk(
  "users/signup",
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
