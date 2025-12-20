// store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

// 🔁 Auto-sync cart with localStorage
store.subscribe(() => {
  const { Items, totalsum } = store.getState().cart;
  const { Items: wishlistItems } = store.getState().wishlist;

  localStorage.setItem("cartitemsproduct", JSON.stringify(Items));
  localStorage.setItem("totalsum", JSON.stringify(totalsum));
  localStorage.setItem("wishlistitems", JSON.stringify(wishlistItems));
});
