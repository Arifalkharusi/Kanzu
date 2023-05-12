import { createSlice } from "@reduxjs/toolkit";

export const selectedItemSlice = createSlice({
  name: "selected item",
  initialState: { item: {} },
  reducers: {
    seletedItem: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const { seletedItem } = selectedItemSlice.actions;
export default selectedItemSlice.reducer;
