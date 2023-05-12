import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "Menu",
  initialState: { displayMenu: true },
  reducers: {
    openMenu: (state, action) => {
      state.displayMenu
        ? (state.displayMenu = false)
        : (state.displayMenu = true);
    },
  },
});

export const { openMenu } = menuSlice.actions;
export default menuSlice.reducer;
