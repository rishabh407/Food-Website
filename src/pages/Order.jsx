// import React, { useState } from "react";
// import { motion } from "framer-motion";

// const menuItems = [
//   { id: 1, name: "Margherita Pizza", price: 250 },
//   { id: 2, name: "Veggie Burger", price: 150 },
//   { id: 3, name: "Pasta Alfredo", price: 200 },
//   { id: 4, name: "Chocolate Cake", price: 120 },
// ];

// const Order = () => {
//   const [cart, setCart] = useState([]);

//   const addToCart = (item) => {
//     const exists = cart.find((c) => c.id === item.id);
//     if (exists) {
//       setCart(
//         cart.map((c) =>
//           c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
//         )
//       );
//     } else {
//       setCart([...cart, { ...item, quantity: 1 }]);
//     }
//   };

//   const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <div className="mt-16 px-6 lg:px-20 py-16 bg-gray-50">
//       {/* Heading */}
//       <motion.div
//         className="text-center mb-12"
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, amount: 0.2 }}
//         transition={{ duration: 1 }}
//       >
//         <h2 className="text-4xl font-bold text-gray-800">Place Your Order</h2>
//         <p className="text-gray-600 mt-4">
//           Choose your favorite dishes and get them delivered hot & fresh!
//         </p>
//       </motion.div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
//         {/* Left: Order Form */}
//         <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
//           <form className="space-y-6">
//             {/* Name */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter your name"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
//                 required
//               />
//             </div>
//             {/* Email */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
//                 required
//               />
//             </div>
//             {/* Phone */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Phone
//               </label>
//               <input
//                 type="tel"
//                 placeholder="Enter your phone number"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
//                 required
//               />
//             </div>
//             {/* Address */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Address
//               </label>
//               <textarea
//                 rows="3"
//                 placeholder="Enter your delivery address"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
//                 required
//               />
//             </div>
//           </form>

//           {/* Menu Items */}
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">
//               Select Items
//             </h3>
//             <div className="grid grid-cols-1 gap-4">
//               {menuItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex justify-between items-center border p-4 rounded-lg shadow-sm"
//                 >
//                   <p className="text-gray-700 font-medium">{item.name}</p>
//                   <button
//                     onClick={() => addToCart(item)}
//                     type="button"
//                     className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//                   >
//                     Add ₹{item.price}
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right: Cart Summary */}
//         <div className="bg-white p-8 rounded-2xl shadow-lg">
//           <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>
//           {cart.length === 0 ? (
//             <p className="text-gray-600">No items added yet.</p>
//           ) : (
//             <ul className="space-y-4">
//               {cart.map((item) => (
//                 <li key={item.id} className="flex justify-between">
//                   <span>
//                     {item.name} x {item.quantity}
//                   </span>
//                   <span>₹{item.price * item.quantity}</span>
//                 </li>
//               ))}
//             </ul>
//           )}
//           <div className="border-t mt-6 pt-4 flex justify-between font-semibold text-lg">
//             <span>Total</span>
//             <span>₹{total}</span>
//           </div>

//           <motion.button
//             type="submit"
//             className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg mt-6"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Place Order
//           </motion.button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Order;

import React, { useState } from "react";
import { motion } from "framer-motion";

const menuItems = [
  { id: 1, name: "Margherita Pizza", price: 250 },
  { id: 2, name: "Veggie Burger", price: 150 },
  { id: 3, name: "Pasta Alfredo", price: 200 },
  { id: 4, name: "Chocolate Cake", price: 120 },
];

const Order = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const exists = cart.find((c) => c.id === item.id);
    if (exists) {
      setCart(
        cart.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const deleteitem=(itemx)=>{
   setCart(
    cart.map((item)=>
  item.id==itemx.id?{...item,quantity:item.quantity-1}:item).filter((item)=>item.quantity>0))
  }
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="mt-16 px-6 lg:px-20 py-16 bg-gray-50">
      {/* Heading */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-gray-800">Place Your Order</h2>
        <p className="text-gray-600 mt-4">
          Choose your favorite dishes and get them delivered hot & fresh!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Left: Order Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
          <form className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
                required
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
                required
              />
            </div>
            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
                required
              />
            </div>
            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address
              </label>
              <textarea
                rows="3"
                placeholder="Enter your delivery address"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
                required
              />
            </div>
          </form>

          {/* Menu Items */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Select Items
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-3 sm:flex-row justify-between items-center border p-4 rounded-lg shadow-sm"
                >
                  <p className="text-gray-700 font-medium">{item.name}</p>
                  <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(item)}
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Add ₹{item.price}
                  </button>
                  <button className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600" onClick={()=>deleteitem(item)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Cart Summary */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>
          {cart.length === 0 ? (
            <p className="text-gray-600">No items added yet.</p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="border-t mt-6 pt-4 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <motion.button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg mt-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Place Order
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Order;
