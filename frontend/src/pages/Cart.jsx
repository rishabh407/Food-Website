import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart, addToCart } from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag } from "react-icons/fa";
import { API_BASE_URL } from "../api/axiosInstance";
import { useAuth } from "../Context/AuthContext";
import { addToCartAsync, clearCartAsync, removeFromCartAsync } from "../redux/cartActions";

const Cart = () => {
  const { userdata} = useAuth();
  const { Items, totalsum } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalItems = Items.reduce((acc, item) => acc + item.quantity, 0);
  useEffect(()=>{
    if(!userdata)
    {
      dispatch(clearCart());
      return;
    }
  },[userdata])
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 px-4 md:px-10 py-20 mt-20">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
            Your Cart
          </h1>
          <p className="text-gray-600 text-lg">
            {Items.length > 0 ? `${totalItems} item${totalItems > 1 ? 's' : ''} in your cart` : 'Your cart is waiting for delicious items'}
          </p>
        </motion.div>

        {/* EMPTY CART */}
        <AnimatePresence>
          {Items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl shadow-xl p-12 md:p-16 text-center max-w-md mx-auto"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="text-7xl mb-6"
              >
                🛒
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Add some delicious items to get started on your food journey!
              </p>
              <motion.button
                onClick={() => navigate("/menu")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
              >
                Browse Menu
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* CART ITEMS */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence>
                  {Items.map((item, index) => {
                    const itemTotal = item.price * item.quantity;

                    return (
                      <motion.div
                        key={`${item.id}-${item.size}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-3 sm:p-4 md:p-5 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 border border-gray-100"
                      >
                        {/* IMAGE */}
                        <div className="w-full sm:w-24 md:w-28 h-32 sm:h-24 md:h-28 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg sm:rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                          <img
                            src={`${API_BASE_URL}${item.image_url}`}
                            alt={item.name}
                            className="h-full w-full object-contain p-2 sm:p-3 group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>

                        {/* DETAILS */}
                        <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:justify-between">
                          <div className="flex-1">
                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 group-hover:text-red-600 transition-colors">
                              {item.name}
                            </h3>

                            {item.size && (
                              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                Size: <span className="font-semibold text-gray-700">{item.size}</span>
                              </p>
                            )}

                            <div className="mt-2 sm:mt-4">
                              <p className="text-xs sm:text-sm text-gray-500 mb-1">
                                Unit Price
                              </p>
                              <p className="text-base sm:text-lg font-bold text-red-600">
                                ₹{item.price}
                              </p>
                              <p className="text-xs sm:text-sm font-semibold text-gray-800 mt-1 sm:mt-2">
                                Total: <span className="text-red-600">₹{itemTotal}</span>
                              </p>
                            </div>
                          </div>

                          {/* QUANTITY CONTROLS */}
                          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 mt-2 sm:mt-0">
                            <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 rounded-lg sm:rounded-xl p-1.5 sm:p-2">
                              <motion.button
                                onClick={() => dispatch(removeFromCartAsync(item))}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white hover:bg-red-50 text-red-600 font-bold shadow-sm transition-colors flex items-center justify-center"
                              >
                                <FaMinus size={10} className="sm:w-3 sm:h-3" />
                              </motion.button>

                              <span className="font-bold text-gray-800 min-w-[1.5rem] sm:min-w-[2rem] text-center text-sm sm:text-base">
                                {item.quantity}
                              </span>

                              <motion.button
                               
                                onClick={()=>dispatch(addToCartAsync(item))}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white hover:bg-green-50 text-green-600 font-bold shadow-sm transition-colors flex items-center justify-center"
                              >
                                <FaPlus size={10} className="sm:w-3 sm:h-3" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* ORDER SUMMARY */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 h-fit lg:sticky lg:top-24 border border-gray-100"
              >
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
                  Order Summary
                </h2>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex justify-between text-sm sm:text-base text-gray-600">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-semibold">₹{totalsum}</span>
                  </div>

                  <div className="flex justify-between text-sm sm:text-base text-gray-600">
                    <span>Delivery Charges</span>
                    <span className="text-green-600 font-semibold">FREE</span>
                  </div>

                  <div className="flex justify-between text-sm sm:text-base text-gray-600">
                    <span>Tax</span>
                    <span className="font-semibold">₹0</span>
                  </div>

                  <hr className="border-gray-200" />

                  <div className="flex justify-between text-lg sm:text-xl font-bold text-gray-800">
                    <span>Total Amount</span>
                    <span className="text-xl sm:text-2xl bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                      ₹{totalsum}
                    </span>
                  </div>
                </div>
                
                <Link to='/checkout'>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 sm:py-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl mb-3 flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <FaShoppingBag />
                    Proceed to Checkout
                  </motion.button>
                </Link>
                
                <motion.button
                  onClick={() => dispatch(clearCartAsync())}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-all border-2 border-red-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <FaTrash />
                  Clear Cart
                </motion.button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Cart;
