import { createAsyncThunk } from "@reduxjs/toolkit";
import userLoginApi from "services/authApi/login.api";
import { setUserLogin } from "utils/storage.utils";

export const loginUserThunk = createAsyncThunk(
  "users/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await userLoginApi({ email, password });
      if (response) {
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
