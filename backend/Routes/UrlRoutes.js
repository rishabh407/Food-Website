import express from "express";
import bcrypt from "bcrypt";
import {  additemtocart, categorywisedata, getallitemsdata, getMe, getUserCart, loginuser, logout, registeruser, removeFromCart } from "../Controllers/Controller.js";
import { Authenticate } from "../Middlewares/Auth.js";
import { authenticate } from "../Middlewares/authenticatemiddleware.js";

const router=new express.Router();

router.get("/products",getallitemsdata);

router.get("/category/:id",categorywisedata)

router.post("/register",registeruser);
  
router.post("/login",loginuser);
router.post("/logout",logout);

router.post("/cart/add",authenticate,additemtocart);
router.post("/cart/remove",authenticate,removeFromCart);
router.get("/cart", authenticate, getUserCart); // ✅ NEW
router.get("/me",authenticate,getMe);
export default router;