import express from "express";
import bcrypt from "bcrypt";
import { categorywisedata, getallitemsdata, loginuser, registeruser } from "../Controllers/Controller.js";

const router=new express.Router();

router.get("/",getallitemsdata);

router.get("/category/:id",categorywisedata)

router.post("/register",registeruser);
  
router.post("/login",loginuser);

export default router;