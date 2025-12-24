import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist, clearWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaShoppingCart, FaHeart, FaHeartBroken } from "react-icons/fa";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../api/axiosInstance";
import { useAuth } from "../Context/AuthContext";

const Wishlist = () => {
    const {userdata}=useAuth();
  const { Items } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromWishlist = (item) => {
    dispatch(removeFromWishlist(item));
    toast.success(`${item.name} removed from wishlist`);
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
    toast.success(`${item.name} added to cart!`);
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    toast.success("Wishlist cleared");
  };
  
  useEffect(()=>{
    if(!userdata)
    {
      dispatch(clearWishlist());
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
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-red-600 to-pink-500 bg-clip-text text-transparent">
                My Wishlist
              </h1>
              <p className="text-gray-600 text-lg">
                {Items.length > 0 
                  ? `${Items.length} item${Items.length > 1 ? 's' : ''} saved for later` 
                  : 'Your wishlist is waiting for favorite items'}
              </p>
            </div>
            {Items.length > 0 && (
              <motion.button
                onClick={handleClearWishlist}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-xl bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-all border-2 border-red-200 flex items-center gap-2"
              >
                <FaTrash />
                Clear All
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* EMPTY WISHLIST */}
        <AnimatePresence>
          {Items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl shadow-xl p-12 md:p-16 text-center max-w-md mx-auto"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="text-7xl mb-6"
              >
                ❤️
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Your wishlist is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Start adding your favorite dishes to your wishlist!
              </p>
              <motion.button
                onClick={() => navigate("/menu")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold hover:from-red-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
              >
                Browse Menu
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              <AnimatePresence>
                {Items.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${item.size}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    {/* IMAGE */}
                    <div className="relative h-48 sm:h-56 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={`${API_BASE_URL}${item.image_url}`}
                        alt={item.name}
                        className="h-full w-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                      />
                      <motion.button
                        onClick={() => handleRemoveFromWishlist(item)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <FaHeartBroken className="text-red-500 group-hover:text-white" size={18} />
                      </motion.button>
                    </div>

                    {/* DETAILS */}
                    <div className="p-4 sm:p-5 md:p-6">
                      <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2">
                        {item.name}
                      </h3>

                      {item.size && (
                        <p className="text-sm text-gray-500 mb-3">
                          Size: <span className="font-semibold text-gray-700">{item.size}</span>
                        </p>
                      )}

                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-xs text-gray-500">Price</span>
                          <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-500 bg-clip-text text-transparent">
                            ₹{item.price}
                          </p>
                        </div>
                      </div>

                      {/* ACTION BUTTONS */}
                      <div className="flex gap-2 sm:gap-3">
                        <motion.button
                          onClick={() => handleAddToCart(item)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                          <FaShoppingCart size={12} />
                          Add to Cart
                        </motion.button>

                        <motion.button
                          onClick={() => handleRemoveFromWishlist(item)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-all border border-red-200"
                        >
                          <FaTrash size={12} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Wishlist;

