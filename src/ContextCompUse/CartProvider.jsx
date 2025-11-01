import React, { useReducer } from 'react'
import CartContext from '../CreateContext/CartContext'
import { useState } from 'react';
import { cartReducer } from '../CartReducer/CartReducer';
const cartInitialState = {
  cart: []
};
const CartProvider = ({children}) => {
   const [state,dispatch]=useReducer(cartReducer,cartInitialState);
     const [selecteditems,setselecteditems]=useState([]);
    return (
      <CartContext.Provider value={{cart:state.cart,dispatch,selecteditems,setselecteditems}}>
        {children}
      </CartContext.Provider>
  )
}

export default CartProvider
