import { createSlice } from "@reduxjs/toolkit";
import { getPlaylistThunk } from "redux/middlewares/playlistThunk";

const initialState = {
  playlists: [],
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
  },
});

export const playlistAction = playlistSlice.actions;
export default playlistSlice.reducer;
