// import React, { useContext } from "react";
// import CartContext from "../CreateContext/CartContext";
// import { select } from "framer-motion/client";

// const CartSummary = () => {
//   const { cart, dispatch, setselecteditems, selecteditems } =
//     useContext(CartContext);

//   const totalAmount = cart.reduce((acc, item) => {
//     const price = Number(item.price.replace("₹", ""));
//     return acc + price * item.qty;
//   }, 0);
//  const handleremoveitems=(item)=>{
//   // Decrease Item Quantity In Cart
 
//   dispatch({ type: "DECREASE_ITEM", payload: item.id });
 
//   // Remove From SelectedItems if qty<=0
// if(item.qty===1)
// {
//   setselecteditems((prevItems) =>
//     prevItems.filter((it) => it.id !== item.id || it.qty > 0)
//   );
// }
//  }
//   return (
//     <div className="p-6 bg-white rounded shadow-md max-w-md mx-auto mt-8">
//       <h2 className="text-2xl font-bold mb-4">🛒 Cart Summary</h2>

//       {cart.length === 0 ? (
//         <p className="text-gray-500 text-center">Your cart is empty</p>
//       ) : (
//         <ul className="space-y-4">
//           {cart.map((item) => (
//             <li
//               key={item.id}
//               className="flex justify-between items-center border-b pb-2"
//             >
//               <div>
//                 <p className="font-semibold">{item.title}</p>
//                 <p className="text-sm text-gray-500">
//                   {item.price} × {item.qty}
//                 </p>
//               </div>
//               <div className="flex gap-2 items-center">
//                 <button
//                   onClick={()=>handleremoveitems(item)}
//                   className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
//                 >
//                   -
//                 </button>
//                 <span>{item.qty}</span>
//                 <button
//                   onClick={() => {dispatch({ type: "ADD_ITEM", payload: item })
//                   setselecteditems((prev) => {
//                       const exists = prev.find((i) => i.id === item.id);
//                       if (exists) return prev; // already added
//                       return [...prev, { ...item, qty: 1 }]; // ✅ always start with qty: 1
//                     });
//                   }}
//                   className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
//                 >
//                   +
//                 </button>
//                 <button
//                   onClick={() =>
//                     dispatch({ type: "REMOVE_ITEM", payload: item.id })
//                   }
//                   className="text-red-500 ml-3 font-bold"
//                 >
//                   ✕
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       {cart.length > 0 && (
//         <div className="mt-6 border-t pt-4">
//           <h3 className="text-lg font-semibold">Total: ₹{totalAmount}</h3>
//           <button
//             onClick={() => dispatch({ type: "CLEAR_CART" })}
//             className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg mt-3 transition"
//           >
//             Checkout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartSummary;


import React, { useContext } from "react";
import CartContext from "../CreateContext/CartContext";
import { NavLink } from "react-router-dom";

const CartSummary = () => {
  const { cart, dispatch, setselecteditems } = useContext(CartContext);

  // 🧮 Calculate total price
  const totalAmount = cart.reduce((acc, item) => {
    const price = Number(item.price.replace("₹", ""));
    return acc + price * item.qty;
  }, 0);

  // 🗑️ Handle decreasing quantity and removing items
  const handleremoveitems = (item) => {
    dispatch({ type: "DECREASE_ITEM", payload: item.id });

    // Remove from selecteditems if quantity becomes 0
    if (item.qty === 1) {
      setselecteditems((prevItems) =>
        prevItems.filter((it) => it.id !== item.id)
      );
    }
  };

  // ➕ Handle increasing quantity or adding new item
  const handleAddItem = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
    setselecteditems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) return prev;
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const handleemptycart=()=>{
    setselecteditems([]);
  }
  return (
    <div className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg max-w-md mx-auto mt-10 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        🛒 Your Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center italic">Your cart is empty</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* 🏷️ Item Info */}
              <div>
                <p className="font-semibold text-gray-700">{item.title}</p>
                <p className="text-sm text-gray-500">
                  {item.price} × {item.qty}
                </p>
              </div>

              {/* ➕➖ Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleremoveitems(item)}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                >
                  –
                </button>

                <span className="min-w-[24px] text-center font-semibold text-gray-700">
                  {item.qty}
                </span>

                <button
                  onClick={() => handleAddItem(item)}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                >
                  +
                </button>

                <button
                  onClick={() =>
                    dispatch({ type: "REMOVE_ITEM", payload: item.id })
                  }
                  className="text-red-500 hover:text-red-600 font-bold ml-2"
                  title="Remove Item"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* 💰 Total Section */}
      {cart.length > 0 && (
        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center text-gray-800 font-semibold text-lg">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>
          <NavLink >     
          <button
            onClick={() => {dispatch({ type: "CLEAR_CART" });handleemptycart()}}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-semibold py-3 rounded-xl mt-5 shadow-md hover:shadow-lg transition-all duration-300"
          >
            Proceed to Checkout
          </button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
