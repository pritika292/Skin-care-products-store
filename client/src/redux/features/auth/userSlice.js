import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  exist: false,
  isAdmin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.exist = true;
      state.isAdmin = action.payload.isAdmin;
    },
    offsetUser: (state) => {
      state.user = {};
      state.exist = false;
      state.isAdmin = false;
    },
  },
});

export const { setUser, offsetUser } = userSlice.actions;
export default userSlice.reducer;
