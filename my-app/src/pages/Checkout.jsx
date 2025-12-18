import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaUser, FaPhone, FaMapMarkerAlt, FaCity, FaHashtag, FaShoppingBag } from "react-icons/fa";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../api/axiosInstance";

const Checkout = () => {
  const { Items, totalsum } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });
  const [errors, setErrors] = useState({});

  const totalItems = Items.reduce((acc, item) => acc + item.quantity, 0);

  const validateForm = () => {
    const newErrors = {};
    if (!address.name.trim()) newErrors.name = "Name is required";
    if (!address.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^[0-9]{10}$/.test(address.phone)) newErrors.phone = "Invalid phone number";
    if (!address.street.trim()) newErrors.street = "Street address is required";
    if (!address.city.trim()) newErrors.city = "City is required";
    if (!address.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^[0-9]{6}$/.test(address.pincode)) newErrors.pincode = "Invalid pincode";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) {
      toast.error("Please fill all fields correctly");
      return;
    }

    setOrderPlaced(true);
    dispatch(clearCart());
    toast.success("Order placed successfully! 🎉");
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 px-4 md:px-10 py-20 mt-20">
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {/* EMPTY CART */}
          {Items.length === 0 && !orderPlaced && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl shadow-xl text-center p-16 max-w-md mx-auto"
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
                Add items to place an order.
              </p>
              <motion.button
                onClick={() => navigate("/menu")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
              >
                Browse Menu
              </motion.button>
            </motion.div>
          )}

          {/* ORDER SUCCESS */}
          {orderPlaced && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white rounded-3xl shadow-2xl text-center p-16 max-w-2xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="mb-6"
              >
                <FaCheckCircle className="text-green-500 text-7xl mx-auto" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold text-green-600 mb-4"
              >
                Order Placed Successfully! 🎉
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 mb-8 text-lg"
              >
                Your order will be delivered to your address soon. Thank you for choosing us!
              </motion.p>
              <motion.button
                onClick={() => navigate("/menu")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
              >
                Browse More Items
              </motion.button>
            </motion.div>
          )}

          {/* CHECKOUT */}
          {Items.length > 0 && !orderPlaced && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                  Checkout
                </h1>
                <p className="text-gray-600 text-lg">
                  Complete your order by filling in the delivery details
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* LEFT SIDE: CART ITEMS */}
                <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Order Items</h2>
                  {Items.map((item, index) => {
                    const itemTotal = item.price * item.quantity;

                    return (
                      <motion.div
                        key={`${item.id}-${item.size}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 md:p-5 flex gap-3 sm:gap-4 md:gap-5 border border-gray-100 hover:shadow-xl transition-shadow"
                      >
                        {/* IMAGE */}
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                          <img
                            src={`${API_BASE_URL}${item.image_url}`}
                            alt={item.name}
                            className="h-full w-full object-contain p-2"
                          />
                        </div>

                        {/* DETAILS */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-bold text-gray-800 line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            {item.size} × {item.quantity}
                          </p>
                          <p className="text-base sm:text-lg font-bold text-red-600 mt-2 sm:mt-3">
                            ₹{itemTotal}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* RIGHT SIDE: STICKY ADDRESS + SUMMARY */}
                <div className="space-y-4 sm:space-y-6 lg:sticky lg:top-24 h-fit">
                  {/* DELIVERY ADDRESS */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 border border-gray-100"
                  >
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
                      Delivery Address
                    </h2>

                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                          <FaUser className="text-red-500 text-sm sm:text-base flex-shrink-0" />
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          className={`w-full border-2 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm transition-all ${
                            errors.name ? "border-red-500" : "border-gray-200 focus:border-red-500"
                          } focus:ring-2 focus:ring-red-200 outline-none`}
                          value={address.name}
                          onChange={(e) => {
                            setAddress({ ...address, name: e.target.value });
                            if (errors.name) setErrors({ ...errors, name: "" });
                          }}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                          <FaPhone className="text-red-500 text-sm sm:text-base flex-shrink-0" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="10-digit phone number"
                          className={`w-full border-2 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm transition-all ${
                            errors.phone ? "border-red-500" : "border-gray-200 focus:border-red-500"
                          } focus:ring-2 focus:ring-red-200 outline-none`}
                          value={address.phone}
                          onChange={(e) => {
                            setAddress({ ...address, phone: e.target.value });
                            if (errors.phone) setErrors({ ...errors, phone: "" });
                          }}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                          <FaMapMarkerAlt className="text-red-500 text-sm sm:text-base flex-shrink-0" />
                          Street Address
                        </label>
                        <input
                          type="text"
                          placeholder="House/Flat No., Street, Area"
                          className={`w-full border-2 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm transition-all ${
                            errors.street ? "border-red-500" : "border-gray-200 focus:border-red-500"
                          } focus:ring-2 focus:ring-red-200 outline-none`}
                          value={address.street}
                          onChange={(e) => {
                            setAddress({ ...address, street: e.target.value });
                            if (errors.street) setErrors({ ...errors, street: "" });
                          }}
                        />
                        {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1">
                          <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                            <FaCity className="text-red-500 text-sm sm:text-base flex-shrink-0" />
                            City
                          </label>
                          <input
                            type="text"
                            placeholder="City"
                            className={`w-full border-2 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm transition-all ${
                              errors.city ? "border-red-500" : "border-gray-200 focus:border-red-500"
                            } focus:ring-2 focus:ring-red-200 outline-none`}
                            value={address.city}
                            onChange={(e) => {
                              setAddress({ ...address, city: e.target.value });
                              if (errors.city) setErrors({ ...errors, city: "" });
                            }}
                          />
                          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                        </div>
                        <div className="flex-1">
                          <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                            <FaHashtag className="text-red-500 text-sm sm:text-base flex-shrink-0" />
                            Pincode
                          </label>
                          <input
                            type="text"
                            placeholder="6-digit pincode"
                            className={`w-full border-2 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm transition-all ${
                              errors.pincode ? "border-red-500" : "border-gray-200 focus:border-red-500"
                            } focus:ring-2 focus:ring-red-200 outline-none`}
                            value={address.pincode}
                            onChange={(e) => {
                              setAddress({ ...address, pincode: e.target.value });
                              if (errors.pincode) setErrors({ ...errors, pincode: "" });
                            }}
                          />
                          {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* ORDER SUMMARY */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 border border-gray-100"
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

                    <motion.button
                      onClick={handlePlaceOrder}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 sm:py-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <FaShoppingBag />
                      Place Order
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Checkout;
