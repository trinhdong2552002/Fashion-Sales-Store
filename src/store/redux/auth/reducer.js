import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    refreshToken: null,
    authenticated: false,
    email: null,
    roles: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.accessToken = action.payload.accessToken;
      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken;
      }
      state.authenticated = true;
      if (action.payload.email !== undefined) {
        state.email = action.payload.email;
      }
      if (action.payload.roles !== undefined) {
        state.roles = action.payload.roles;
      }
    },
    clearAuth: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.authenticated = false;
      state.email = null;
      state.roles = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
