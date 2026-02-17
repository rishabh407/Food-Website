import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaPhone, FaMapMarkerAlt, FaShoppingBag, FaHistory, FaPlusCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import api, { API_BASE_URL } from "../api/axiosInstance";
import { clearCartAsync } from "../redux/cartActions";

const Checkout = () => {
  const { Items, totalsum } = useSelector((state) => state.cart);
  const { userdata, setuserdata } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [useSaved, setUseSaved] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  // 1. Sync data from AuthContext when userdata loads
  useEffect(() => {
    if (userdata?.address) {
      setUseSaved(true);
      setAddress({
        name: userdata.address.fullName || userdata.name || "",
        phone: userdata.address.phone || "",
        street: userdata.address.street || "",
        city: userdata.address.city || "",
        pincode: userdata.address.pincode || "",
      });
    } else if (userdata) {
      setAddress((prev) => ({ ...prev, name: userdata.name || "" }));
    }
  }, [userdata]);

  const handleToggleAddress = (mode) => {
    if (mode === "saved") {
      setUseSaved(true);
      setAddress({
        name: userdata?.address?.fullName || userdata?.name || "",
        phone: userdata?.address?.phone || "",
        street: userdata?.address?.street || "",
        city: userdata?.address?.city || "",
        pincode: userdata?.address?.pincode || "",
      });
    } else {
      setUseSaved(false);
      setAddress({ name: userdata?.name || "", phone: "", street: "", city: "", pincode: "" });
    }
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!address.name?.trim()) newErrors.name = "Name is required";
    if (!address.phone?.trim()) newErrors.phone = "Phone is required";
    if (!address.street?.trim()) newErrors.street = "Street is required";
    if (!address.city?.trim()) newErrors.city = "City is required";
    if (!address.pincode?.trim()) newErrors.pincode = "Pincode is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      toast.error("Please fill all details");
      return;
    }
    try {
      // 2. Map 'name' to 'fullName' to satisfy Backend Schema requirements
      const payload = {
        address: {
          fullName: address.name, // 👈 KEY FIX: schema needs fullName
          phone: address.phone,
          street: address.street,
          city: address.city,
          pincode: address.pincode,
        },
        Items,
        totalsum,
      };

      const res = await api.post("/order/details", payload);

      if (res.data.success) {
        // Sync the updated user (with the newly saved address) to global context
        if (res.data.user) setuserdata(res.data.user);

        setOrderPlaced(true);
        dispatch(clearCartAsync());
        toast.success("Order Placed Successfully! 🎉");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      toast.error(error.response?.data?.message || "Order Failed. Please try again.");
    }
  };

  if (Items.length === 0 && !orderPlaced) {
    return (
      <div className="pt-32 text-center min-h-screen">
        <h2 className="text-2xl font-bold">Your cart is empty!</h2>
        <button onClick={() => navigate("/menu")} className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg">Go to Menu</button>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 pt-28 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatePresence>
          {!orderPlaced ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* LEFT SIDE: PRODUCT REVIEW */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Review Items</h2>
                {Items.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <img 
                      src={`${API_BASE_URL}${item.image_url}`} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded-lg" 
                      onError={(e) => e.target.src = "https://via.placeholder.com/150"}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">Size: {item.size} | Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-red-600">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              {/* RIGHT SIDE: SHIPPING & BILLING */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                  <h2 className="text-xl font-bold mb-4">Shipping Details</h2>
                  
                  {/* Address Toggle UI */}
                  {userdata?.address && (
                    <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
                      <button 
                        onClick={() => handleToggleAddress("saved")} 
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${useSaved ? "bg-white text-red-600 shadow-sm" : "text-gray-500"}`}
                      >
                        <FaHistory className="inline mr-1"/> Saved
                      </button>
                      <button 
                        onClick={() => handleToggleAddress("new")} 
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${!useSaved ? "bg-white text-red-600 shadow-sm" : "text-gray-500"}`}
                      >
                        <FaPlusCircle className="inline mr-1"/> New
                      </button>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <input 
                        disabled={useSaved} 
                        placeholder="Full Name" 
                        value={address.name} 
                        onChange={(e) => setAddress({...address, name: e.target.value})} 
                        className={`w-full border p-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-red-400 ${useSaved ? "bg-gray-50 text-gray-500 cursor-not-allowed" : "bg-white"}`} 
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <input 
                      disabled={useSaved} 
                      placeholder="Phone" 
                      value={address.phone} 
                      onChange={(e) => setAddress({...address, phone: e.target.value})} 
                      className={`w-full border p-3 rounded-lg text-sm outline-none ${useSaved ? "bg-gray-50" : ""}`} 
                    />

                    <input 
                      disabled={useSaved} 
                      placeholder="Street Address" 
                      value={address.street} 
                      onChange={(e) => setAddress({...address, street: e.target.value})} 
                      className={`w-full border p-3 rounded-lg text-sm outline-none ${useSaved ? "bg-gray-50" : ""}`} 
                    />

                    <div className="flex gap-2">
                      <input 
                        disabled={useSaved} 
                        placeholder="City" 
                        value={address.city} 
                        onChange={(e) => setAddress({...address, city: e.target.value})} 
                        className={`w-1/2 border p-3 rounded-lg text-sm outline-none ${useSaved ? "bg-gray-50" : ""}`} 
                      />
                      <input 
                        disabled={useSaved} 
                        placeholder="Pincode" 
                        value={address.pincode} 
                        onChange={(e) => setAddress({...address, pincode: e.target.value})} 
                        className={`w-1/2 border p-3 rounded-lg text-sm outline-none ${useSaved ? "bg-gray-50" : ""}`} 
                      />
                    </div>
                  </div>
                </div>

                {/* Final Checkout Button */}
                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                  <div className="flex justify-between text-lg font-bold mb-4">
                    <span>Total Amount</span>
                    <span className="text-red-600">₹{totalsum}</span>
                  </div>
                  <button 
                    onClick={handlePlaceOrder} 
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <FaShoppingBag /> Place Order
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-20 bg-white rounded-3xl shadow-xl">
              <div className="text-6xl text-green-500 mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-gray-800">Order Placed!</h2>
              <p className="text-gray-500 mt-2">Your order has been recorded successfully.</p>
              <button onClick={() => navigate("/orders")} className="mt-8 bg-gray-800 text-white px-8 py-3 rounded-xl font-semibold hover:bg-black transition">View My Orders</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Checkout;