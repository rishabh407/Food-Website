import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Heart,
  User,
  ShoppingCart,
} from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import { useSelector } from "react-redux";
import api from "../api/axiosInstance";

const Dashboard = () => {
  const { userdata } = useAuth();
    const [totalorders, settotalorders] = useState(0);
    const { Items } = useSelector((state) => state.cart);
  const { Items: wishlistItems } = useSelector((state) => state.wishlist);
  const wishlistCount = wishlistItems.length;
  const cartItemCount = Items.reduce((acc, item) => acc + item.quantity, 0);
  console.log(totalorders);
   useEffect(()=>{
     if(userdata)
     {
    const fetchtotalorder=async()=>{
    const res=await api.get("/totalorders");
    settotalorders(res.data.totalOrders);
   }
   fetchtotalorder();
     }
   },[userdata]);
  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            👋 Welcome, {userdata?.name || "User"}
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your account, orders and preferences
          </p>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {/* ORDERS */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Orders</p>
                <p className="text-xl font-bold text-gray-800">{totalorders}</p>
              </div>
            </div>
          </div>

          {/* WISHLIST */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-pink-100 rounded-lg">
                <Heart className="text-pink-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Wishlist Items</p>
                <p className="text-xl font-bold text-gray-800">
                  {wishlistCount}
                </p>
              </div>
            </div>
          </div>

          {/* CART */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <ShoppingCart className="text-orange-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Cart Items</p>
                <p className="text-xl font-bold text-gray-800">
                  {cartItemCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/orders"
              className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition"
            >
              <Package />
              <span>My Orders</span>
            </Link>

            <Link
              to="/profile"
              className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition"
            >
              <User />
              <span>Edit Profile</span>
            </Link>

            <Link
              to="/wishlist"
              className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition"
            >
              <Heart />
              <span>Wishlist</span>
            </Link>

            <Link
              to="/cart"
              className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition"
            >
              <ShoppingCart />
              <span>Go to Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
