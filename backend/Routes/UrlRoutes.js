import express from "express";
import bcrypt from "bcrypt";
import {  additemtocart, addtowishlist, categorywisedata, clearcart, cleartowishlist, getallitemsdata, getMe, gettowishlist, getUserCart, loginuser, logout, orderdetails, registeruser, removeFromCart, removetowishlist } from "../Controllers/Controller.js";
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

export default router;
