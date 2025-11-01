import React, { useContext, useReducer } from "react";
import CartContext from "../CreateContext/CartContext";
import DataContext from "../CreateContext/DataContext";
// import { CartReducer } from "../CartReducer/CartReducer";
const ProductList = () => {
  const { menuItems} = useContext(DataContext);
    const{selecteditems,dispatch}=useContext(CartContext);
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {selecteditems.map((product) => (
        <div key={product.id} className="border rounded-xl p-4 shadow hover:shadow-lg">
          <img
            src={product.image}
            alt={product.title}
            className="rounded-lg h-40 w-full object-cover"
          />
          <h3 className="font-semibold mt-2">{product.title}</h3>
          <p className="text-gray-600 text-center">{product.price}</p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white w-full mt-2 py-2 rounded-lg transition"
          >
            Added
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
