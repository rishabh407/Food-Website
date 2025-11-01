import React, { useReducer } from "react";
import ProductList from "../Components/ProductList";
import CartSummary from "../Components/CartSummary";
import { NavLink } from "react-router-dom";

const Order = () => {
  return (
    <div className="flex flex-col md:flex-row pt-30 pb-20 relative">
      {/* Products Section */}
      <div className="md:w-2/3 w-full">
        <ProductList />
      </div>

      {/* Cart Summary Section */}
      <div className="md:w-1/3 w-full md:border-l border-t md:border-t-0 bg-gray-50">
        <CartSummary />
      </div>
<NavLink
  to="/menu"
  className="absolute bottom-3 left-1/2 transform -translate-x-1/2"
>
  <button
    className="bg-gradient-to-r from-blue-600 to-purple-600 
               text-white font-semibold px-6 py-3 rounded-full 
               shadow-lg hover:scale-105 hover:shadow-xl 
               transition-all duration-300 ease-in-out"
  >
    See Menu 🍽️
  </button>
</NavLink>

    </div>
  );
};

export default Order;
