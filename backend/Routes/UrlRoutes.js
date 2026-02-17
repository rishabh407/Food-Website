import express from "express";
import bcrypt from "bcrypt";
import {  additemtocart, addtowishlist, categorywisedata, clearcart, cleartowishlist, fetchorderdetails, fetchTotalOrders, getallitemsdata, getMe, gettowishlist, getUserCart, loginuser, logout, orderdetails, registeruser, removeFromCart, removetowishlist, updateProfile } from "../Controllers/Controller.js";
import { authenticate } from "../Middlewares/authenticatemiddleware.js";

const router=new express.Router();

router.get("/me",authenticate,getMe);
router.get("/products",getallitemsdata);
router.get("/category/:id",categorywisedata)
router.post("/login",loginuser);
router.post("/register",registeruser);
router.post("/logout",logout);
router.post("/cart/add",authenticate,additemtocart);
router.post("/cart/remove",authenticate,removeFromCart);
router.delete("/cart/clear",authenticate,clearcart);
router.get("/cart", authenticate, getUserCart); 
router.post("/wishlist/add", authenticate,addtowishlist);
router.get("/wishlist", authenticate, gettowishlist); 
router.post("/wishlist/remove", authenticate, removetowishlist);
router.delete("/wishlist/clear", authenticate, cleartowishlist); 
router.post("/order/details",authenticate,orderdetails);
router.get("/order/fetchdetails",authenticate,fetchorderdetails);
router.get("/totalorders",authenticate, fetchTotalOrders);
router.put("/user/profile",authenticate, updateProfile);

export default router;

// vercel.json file contents 

// {
//   "buildCommand": "npm run build",
//   "outputDirectory": "dist",
//   "devCommand": "npm run dev",
//   "installCommand": "npm install",
//   "framework": "vite",
//   "rewrites": [
//     {
//       "source": "/(.*)",
//       "destination": "/index.html"
//     }
//   ]
// }

// .env.development and .env.production 
// # VITE_API_URL=https://food-api-efrg.onrender.com