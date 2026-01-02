import mongoose, { mongo } from "mongoose";

const UserSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
})
export const User=mongoose.model("User",UserSchema);

const CartSchema=new mongoose.Schema({
    
})