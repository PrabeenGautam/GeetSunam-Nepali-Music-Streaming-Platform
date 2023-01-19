import { createSlice } from "@reduxjs/toolkit";
import {
  getPlaylistThunk,
  getPlaylistByIDThunk,
} from "@/redux/middlewares/playlistThunk";

const initialState = {
  playlists: [],
  playlistByID: null,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {},
  extraReducers: {
    [getPlaylistThunk.fulfilled]: (state, { payload }) => {
      state.playlists = payload?.data?.playlists;
    },
    [getPlaylistThunk.rejected]: (state, { payload }) => {
      state.playlists = "";
    },
    [getPlaylistThunk.pending]: (state) => {
      state.playlists = "";
    },
    [getPlaylistByIDThunk.fulfilled]: (state, { payload }) => {
      state.playlistByID = payload?.data?.playlist;
    },
    [getPlaylistByIDThunk.rejected]: (state, { payload }) => {
      state.playlistByID = null;
    },
    [getPlaylistByIDThunk.pending]: (state) => {
      state.playlistByID = null;
    },
  },
});

export const playlistAction = playlistSlice.actions;
export default playlistSlice.reducer;
