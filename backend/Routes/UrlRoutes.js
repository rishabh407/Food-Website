import express from "express";
import { User } from "../Model/Model.js";
import bcrypt from "bcrypt";
import { loginuser, registeruser } from "../Controllers/Controller.js";
const router=new express.Router();

router.post("/register",registeruser);
  
router.post("/login",loginuser);



export default router;