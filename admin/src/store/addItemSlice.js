import { createSlice } from "@reduxjs/toolkit";

export const AddItemSlice = createSlice({
  name: "add Item",
  initialState: {
    data: [],
    imgArr: [],
    size: [
      { length: 52, quantity: 0 },
      { length: 54, quantity: 0 },
      { length: 56, quantity: 0 },
      { length: 58, quantity: 0 },
      { length: 60, quantity: 0 },
    ],
  },
  reducers: {
    addImg: (state, action) => {
      state.imgArr.push(action.payload);
    },
    deleteImg: (state, action) => {
      state.imgArr.splice(action.payload, 1);
    },
    addMessurements: (state, action) => {
      state.size[action.payload.index].quantity = action.payload.qty;
    },
  },
});

export const { addImg, deleteImg, addMessurements } = AddItemSlice.actions;
export default AddItemSlice.reducer;
