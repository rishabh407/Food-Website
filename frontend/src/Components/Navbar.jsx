import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Home, UtensilsCrossed, Info, Images, Heart,DoorOpen,UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useAuth } from "../Context/AuthContext";

const Navbar = ({ onLoginClick, onRegisterClick }) => {
  
  // Take Data From the User So That We Can Display it while login. Take It From Context. 
  const {userdata,logout}=useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  // location provides which current page is opened and returns the path of it.
  console.log(location.pathname)
  const { Items } = useSelector((state) => state.cart);
  const { Items: wishlistItems } = useSelector((state) => state.wishlist);
  const cartItemCount = Items.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;
  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Menu", path: "/menu", icon: UtensilsCrossed },
    { name: "About", path: "/about", icon: Info },
    { name: "Gallery", path: "/gallery", icon: Images },
  ];
  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white/95 backdrop-blur-md shadow-lg fixed top-0 left-0 w-full z-50 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-1 sm:gap-2 group"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="text-2xl sm:text-3xl"
            >
              🍔
            </motion.div>
            <span className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent group-hover:from-red-700 group-hover:to-orange-600 transition-all">
              Foodies
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                    isActive(link.path)
                      ? "text-red-600 bg-red-50 font-semibold"
                      : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={18} />
                  <span>{link.name}</span>
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-red-50 rounded-lg -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
            {/* Wishlist Button */}
            <Link
              to="/wishlist"
              className={`relative ml-2 px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                isActive("/wishlist")
                  ? "text-red-600 bg-red-50"
                  : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
              }`}
            >
              <Heart size={20} className={isActive("/wishlist") ? "fill-red-600" : ""} />
              <span className="hidden lg:inline">Wishlist</span>
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
                >
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </motion.span>
              )}
            </Link>
            
            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative ml-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <ShoppingCart size={20} />
              <span className="hidden lg:inline">Cart</span>
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
                >
                  {cartItemCount > 9 ? "9+" : cartItemCount}
                </motion.span>
              )}
            </Link>
            {/* AUTH BUTTONS */}
            {userdata ? (
  <div className="flex items-center gap-2 ml-2">
    <span className="font-semibold text-gray-700">
      Hi, {userdata.name}
    </span>

    <button
      onClick={logout}
      className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
    >
      Logout
    </button>
  </div>
) : (
  <div className="flex items-center gap-2 ml-2">
    <button
      onClick={onLoginClick}
      className="px-4 py-2 rounded-lg flex items-center gap-2 text-gray-700 hover:text-red-600 hover:bg-gray-50 transition"
    >
      <DoorOpen size={18} />
      Login
    </button>

    <button
      onClick={onRegisterClick}
      className="px-4 py-2 rounded-lg flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white hover:opacity-90 transition"
    >
      <UserPlus size={18} />
      Register
    </button>
  </div>
)}


          </div>
          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              to="/wishlist"
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Heart size={22} className={isActive("/wishlist") ? "text-red-600 fill-red-600" : "text-gray-700"} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ShoppingCart size={22} className="text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount > 9 ? "9+" : cartItemCount}
                </span>
              )}
            </Link>
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
      >
        <div className="px-4 py-2 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive(link.path)
                    ? "text-red-600 bg-red-50 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={20} />
                <span>{link.name}</span>
              </Link>
            );
          })}
          <Link
            to="/wishlist"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive("/wishlist")
                ? "text-red-600 bg-red-50 font-semibold"
                : "text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setIsOpen(false)}
          >
            <Heart size={20} className={isActive("/wishlist") ? "fill-red-600" : ""} />
            <span>Wishlist</span>
            {wishlistCount > 0 && (
              <span className="ml-auto bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistCount > 9 ? "9+" : wishlistCount}
              </span>
            )}
          </Link>
          {/* AUTH BUTTONS - MOBILE */}
          <div className="pt-2 border-t border-gray-200 space-y-2">
  {userdata ? (
    <>
      {/* USER INFO */}
      <div className="px-4 py-3 rounded-lg bg-gray-50 text-gray-700 font-semibold">
        👋 Hi, {userdata.name}
      </div>

      {/* LOGOUT */}
      <button
        onClick={() => {
        logout();
          setIsOpen(false);
        }}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      {/* LOGIN */}
      <button
        onClick={() => {
          onLoginClick();
          setIsOpen(false);
        }}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
      >
        <DoorOpen size={20} />
        Login
      </button>

      {/* REGISTER */}
      <button
        onClick={() => {
          onRegisterClick();
          setIsOpen(false);
        }}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white"
      >
        <UserPlus size={20} />
        Register
      </button>
    </>
  )}
</div>


        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
