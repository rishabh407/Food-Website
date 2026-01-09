import express from "express";
import bcrypt from "bcrypt";
import { additemtocart, categorywisedata, getallitemsdata, getUserCart, loginuser, logout, registeruser } from "../Controllers/Controller.js";
import { Authenticate } from "../Middlewares/Auth.js";

const router=new express.Router();

router.get("/products",getallitemsdata);

router.get("/category/:id",categorywisedata)

router.post("/register",registeruser);
  
router.post("/login",loginuser);
router.post("/logout",logout);

router.post("/cart/add",Authenticate,additemtocart);

router.get("/cart", Authenticate, getUserCart); // ✅ NEW

export default router;