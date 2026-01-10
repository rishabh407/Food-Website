import api from "../api/axiosInstance";
import { addToCart, removeFromCart, clearCart, setCartFromBackend } from "./cartSlice";
// import axios from "axios";

/* ADD TO CART (Backend + Redux) */

export const addToCartAsync = (item) => async (dispatch) => {
  try {
    // const token = localStorage.getItem("foodtoken");
    // await api.post(
    //   "/cart/add",
    //   {
    //     productId: item._id,   // ✅ MongoDB _id
    //     size: item.size,
    //   }
    //   // {
    //   //   headers: {
    //   //     Authorization:`Bearer ${token}`,
    //   //   },
    //   // }
    // );
    dispatch(addToCart(item)); // optimistic UI update
  } catch (error) {
    console.error("Add to cart failed", error);
  }
};

/**
 * REMOVE FROM CART
 */
export const removeFromCartAsync = (item) => async (dispatch) => {
  try {
    await api.post("/cart/remove", {
      productId: item.id,
      size: item.size,
    });

    dispatch(removeFromCart(item));
  } catch (error) {
    console.error("Remove from cart failed", error);
  }
};

/**
 * CLEAR CART
 */
export const clearCartAsync = () => async (dispatch) => {
  try {
    await api.delete("/cart/clear");
    dispatch(clearCart());
  } catch (error) {
    console.error("Clear cart failed", error);
  }
};

export const fetchCartAsync = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("foodtoken");

    const res = await api.get("/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setCartFromBackend(res.data));
  } catch (error) {
    console.error("Failed to fetch cart", error);
  }
};
