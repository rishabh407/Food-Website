import { useDispatch } from "react-redux";
import api from "../api/axiosInstance";
import { addToWishlist, clearWishlist, removeFromWishlist, setWishlistFromBackend } from "./wishlistSlice";

export const wishlistAsync = (item) => async (dispatch) => {
  try {
    await api.post(
      "/wishlist/add",
      {
        productId: item.id,   // ✅ MongoDB _id
        size: item.size,
      }
    );
    dispatch(addToWishlist(item)); // optimistic UI update
  } catch (error) {
    console.error("Add to wishlistfailed", error);
  }
};

// Export fetch items from the cart.

export const fetchWishlistAsync = () => async (dispatch) => {
  try {
    const res = await api.get("/wishlist");
    // console.log(res);
    dispatch(setWishlistFromBackend(res.data));
  } catch (error) {
    console.error("Failed to fetch wishlist", error);
  }
};

  // REMOVE FROM CART
export const removeFromWishlistAsync = (item) => async (dispatch) => {
  try {
    await api.post("/wishlist/remove", {
      productId: item.id,
      size: item.size,
    }
);

    dispatch(removeFromWishlist(item));
  } catch (error) {
    console.error("Remove from wishlist failed", error);
  }
};

export const clearWishlistAsync = () => async (dispatch) => {
  try {
    await api.delete("/wishlist/clear");
    dispatch(clearWishlist());
  } catch (error) {
    console.error("Clear wishlist failed", error);
  }
};



