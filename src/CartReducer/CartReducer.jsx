
export const cartReducer = (state, action) => {
  switch (action.type) {
    // Add or increase quantity
    case "ADD_ITEM": {
      const existing = state.cart.find(item => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + 1 }
              : item
          )
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, qty: 1 }]
        };
      }
    }

    // Decrease quantity or remove if qty = 1
    case "DECREASE_ITEM": {
      const existing = state.cart.find(item => item.id === action.payload);
      if (!existing) return state;

      if (existing.qty === 1) {
        // remove item completely
        return {
          ...state,
          cart: state.cart.filter(item => item.id !== action.payload)
        };
      } else {
        // decrease qty
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload
              ? { ...item, qty: item.qty - 1 }
              : item
          )
        };
      }
    }

    // Remove item completely
    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };

    // Clear entire cart
    case "CLEAR_CART":
      return { ...state, cart: [] };

    default:
      return state;
  }
};
