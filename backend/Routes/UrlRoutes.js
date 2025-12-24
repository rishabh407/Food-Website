import express from "express";
import { User } from "../Model/Model.js";
import bcrypt from "bcrypt";
const router=new express.Router();

router.post("/register",async(req,res)=>{
   try{
   const {name,email,password}=req.body;
   const useremailcheck=await User.findOne({email});
   if(useremailcheck)
      {
        return res.status(409).json({
           message:"User already registered with this email",
        });
      }

   // Hash  Password

   const hashedPassword=await bcrypt.hash(password,10);

   //  Storing Data Into The Database 
    const user=await User.create({
      name,email,password:hashedPassword,
    });  
      return res.status(201).json({
         message:"User registered successfully",user:{
            id: user._id,
            name: user.name,
            email: user.email,    
         }
      })
   }catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }     
});

router.post("/login",async(req,res)=>{
     try{
      const {email,password}=req.body;
      // Find User By Email
      const user=await User.findOne({email});
      if(!user){
         return res.status(404).json({
            message: "User not registered",
         })
      }
      // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

   // 3️⃣ Success
    return res.status(200).json({
      message: "Login successful",
      user:{
        name: user.name,
        email: user.email,
      },
     });
   }
   catch (error) {
      return res.status(500).json({
        message: "Login failed",
      });
    }
});

export default router;