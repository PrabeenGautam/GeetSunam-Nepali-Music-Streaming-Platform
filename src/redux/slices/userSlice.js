import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: () => {},
  },
});
export const { loginUser } = userSlice.actions;
export default userSlice.reducer;
