import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "Menu",
  initialState: { displaySearch: true },
  reducers: {
    openSearch: (state, action) => {
      state.displaySearch
        ? (state.displaySearch = false)
        : (state.displaySearch = true);
    },
  },
});

export const { openSearch } = searchSlice.actions;
export default searchSlice.reducer;
