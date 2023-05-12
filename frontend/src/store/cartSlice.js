import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "Menu",
  initialState: { displayCart: true, items: [] },
  reducers: {
    openCart: (state, action) => {
      state.displayCart
        ? (state.displayCart = false)
        : (state.displayCart = true);
    },
    addItem: (state, action) => {
      const { product, size, length, quantity } = action.payload;

      const found = state.items.find(
        (x) => x.product === product && x.size === size && x.length === length
      );

      if (found) {
        const updated = {
          ...found,
          quantity: found.quantity + quantity,
        };

        const updatedItems = state.items.map((x) =>
          x.product === product && x.size === size && x.length === length
            ? updated
            : x
        );

        localStorage.setItem("cart", JSON.stringify(updatedItems));
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify([...state.items, action.payload])
        );
      }
    },
    loadItems: (state, action) => {
      if (localStorage.getItem("cart")) {
        state.items = JSON.parse(localStorage.getItem("cart"));
      }
    },
    removeItem: (state, action) => {
      state.items.splice(action.payload, 1);
      localStorage.setItem("cart", JSON.stringify(state.items));
      state.items = JSON.parse(localStorage.getItem("cart"));
    },
    editItem: (state, action) => {
      if (action.payload.dir === "plus") {
        state.items[action.payload.index].quantity += 1;
      }
      if (action.payload.dir === "minus") {
        state.items[action.payload.index].quantity -= 1;
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});

export const { openCart, addItem, removeItem, editItem, loadItems } =
  cartSlice.actions;
export default cartSlice.reducer;
