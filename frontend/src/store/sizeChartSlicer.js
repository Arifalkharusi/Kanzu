import { createSlice } from "@reduxjs/toolkit";

export const sizeChart = createSlice({
  name: "Menu",
  initialState: { diplaySizeChart: true },
  reducers: {
    openSizeChart: (state, action) => {
      state.diplaySizeChart
        ? (state.diplaySizeChart = false)
        : (state.diplaySizeChart = true);
    },
  },
});

export const { openSizeChart } = sizeChart.actions;
export default sizeChart.reducer;
