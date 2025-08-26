import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    name: null,
    email: null,
    avatarUrl: null,
    dob: null,
    gender: null,
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatarUrl = action.payload.avatarUrl;
      state.dob = action.payload.dob;
      state.gender = action.payload.gender;
      console.log("setUser action payload:", action.payload);
    },
    clearUser: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.avatarUrl = null;
      state.dob = null;
      state.gender = null;
    },
  },
});

export const { setUserInfo, clearUser } = userSlice.actions;
export const selectUser = (state) => state.user;
// export const selectUserId = (state) => state.user.user?.id;

export default userSlice.reducer;
