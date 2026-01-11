import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 Items:[],
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

    setWishlistFromBackend: (state, action) => {
      console.log(state.Items);
      state.Items = action.payload.items.map((item) => ({
        _id: item.product._id,
        name: item.product.name,
        image_url: item.product.image_url,
        size: item.size,
        price: item.price,
      }));

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

export const { addToWishlist, removeFromWishlist,setWishlistFromBackend, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

