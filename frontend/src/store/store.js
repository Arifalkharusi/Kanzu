import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./menuSlice";
import cartSlice from "./cartSlice";
import searchSlice from "./searchSlice";
import sizeChartSlicer from "./sizeChartSlicer";
import findSizeSlicer from "./findSizeSlicer";
import selectedItemSlice from "./selectedItemSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    menuSlice,
    cartSlice,
    searchSlice,
    sizeChartSlicer,
    findSizeSlicer,
    selectedItemSlice,
    userSlice,
  },
});
