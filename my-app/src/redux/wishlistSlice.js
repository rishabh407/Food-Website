import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Items: JSON.parse(localStorage.getItem("wishlistitems")) || [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      
      // Check if item already exists (by id and size)
      const existing = state.Items.find(
        i => i.id === item.id && i.size === item.size
      );

      if (!existing) {
        state.Items.push(item);
      }
    },

    removeFromWishlist: (state, action) => {
      const item = action.payload;
      
      state.Items = state.Items.filter(
        i => !(i.id === item.id && i.size === item.size)
      );
    },

    clearWishlist: (state) => {
      state.Items = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

