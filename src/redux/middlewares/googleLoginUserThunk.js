import { createAsyncThunk } from "@reduxjs/toolkit";
import googleLoginApi from "services/authApi/googleLogin.api";
import { setUserLogin } from "utils/storage.utils";

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
