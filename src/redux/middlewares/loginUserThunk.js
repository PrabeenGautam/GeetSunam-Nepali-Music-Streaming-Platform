import { createAsyncThunk } from "@reduxjs/toolkit";
import userLoginApi from "services/authApi/login.api";
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
