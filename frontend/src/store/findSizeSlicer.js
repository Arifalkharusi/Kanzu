import { createSlice } from "@reduxjs/toolkit";

export const findSizeSlice = createSlice({
  name: "Menu",
  initialState: { diplayFindSize: true },
  reducers: {
    openFindSize: (state, action) => {
      state.diplayFindSize
        ? (state.diplayFindSize = false)
        : (state.diplayFindSize = true);
    },
  },
});

export const { openFindSize } = findSizeSlice.actions;
export default findSizeSlice.reducer;
