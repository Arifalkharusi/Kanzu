import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: { data: {}, token: null },
  reducers: {
    login: (state, action) => {
      if (action.payload !== "token-error") {
        state.token = localStorage.getItem("token");
      } else {
        state.token = null;
      }
    },
    userData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { login, userData } = userSlice.actions;
export default userSlice.reducer;
