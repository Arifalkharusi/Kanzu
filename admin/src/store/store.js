import { configureStore } from "@reduxjs/toolkit";
import addItemSlice from "./addItemSlice";

export const store = configureStore({ reducer: { addItemSlice } });
