import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    loggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.loggedIn = false;
      state.user = {};
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
