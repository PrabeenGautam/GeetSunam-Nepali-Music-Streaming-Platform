import { createAsyncThunk } from "@reduxjs/toolkit";
import { signUpApi, googleSignUpApi } from "@/services/authApi/signup.api";
import { setUserLogin } from "@/utils/storage.utils";

export const signUpUserThunk = createAsyncThunk(
  "users/signup",
  async ({ email, password, fullname, confirmPassword, role }, thunkAPI) => {
    try {
      const response = await signUpApi({
        email,
        password,
        fullname,
        confirmPassword,
        role,
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

export const googleSignUpUserThunk = createAsyncThunk(
  "users/signup",
  async ({ googleAccessToken }, thunkAPI) => {
    try {
      const response = await googleSignUpApi({ googleAccessToken });
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
