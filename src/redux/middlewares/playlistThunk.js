import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPlaylistByID,
  getPlaylistsAPI,
} from "@/services/playlistApi/getPlaylist.api";

export const getPlaylistThunk = createAsyncThunk(
  "playlist",
  async (_, thunkAPI) => {
    try {
      const response = await getPlaylistsAPI();
      if (response) return response;
      else return thunkAPI.rejectWithValue(response);
    } catch (error) {
      thunkAPI.rejectWithValue(null);
    }
  }
);

export const getPlaylistByIDThunk = createAsyncThunk(
  "playlist/id",
  async (id, thunkAPI) => {
    try {
      const response = await getPlaylistByID(id);
      if (response) return response;
      else return thunkAPI.rejectWithValue(response);
    } catch (error) {
      thunkAPI.rejectWithValue(null);
    }
  }
);
