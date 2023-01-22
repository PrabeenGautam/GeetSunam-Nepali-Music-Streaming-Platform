const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  featuredSongs: null,
  newReleasedSongs: null,
  recentlyPlayedSongs: null,
  trendingSongs: null,
  recommendation: null,
  library: null,
};

const songSlice = createSlice({
  name: "SONGS",
  initialState,
  extraReducers: {},
});
