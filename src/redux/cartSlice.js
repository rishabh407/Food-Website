import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  Items: JSON.parse(localStorage.getItem("cartitemsproduct")) || [],
  totalsum: JSON.parse(localStorage.getItem("totalsum")) || 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      // Check for existing item with same id AND size
      const existing = state.Items.find(
        i => i.id === item.id && i.size === item.size
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.Items.push({ ...item, quantity: 1 });
      }

      state.totalsum = state.Items.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      );
    },

    removeFromCart: (state, action) => {
      const item = action.payload;

      // Check for existing item with same id AND size
      const existing = state.Items.find(
        i => i.id === item.id && i.size === item.size
      );

      if (!existing) return;

      if (existing.quantity > 1) {
        existing.quantity -= 1;
      } else {
        state.Items = state.Items.filter(
          i => !(i.id === item.id && i.size === item.size)
        );
      }

      state.totalsum = state.Items.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      );
    },

    clearCart: (state) => {
      state.Items = [];
      state.totalsum = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
