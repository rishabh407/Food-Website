import bcrypt from "bcrypt";
import { generatetoken } from "../GenerateToken/token.js";
import User from "../Model/User.js";
import Product from "../Model/Product.js";
import Cart from "../Model/Cart.js";
export const registeruser=async(req,res)=>{
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
}

export const loginuser=async(req,res)=>{
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
       const token=generatetoken(user);
       // 3️⃣ Success
        return res.status(200).json({
          message: "Login successful",
          user:{
            name: user.name,
            email: user.email,
          },
          token,
         });
       }
       catch (error) {
          return res.status(500).json({
            message: "Login failed",
          });
        }
}

export const getallitemsdata=async(req,res)=>{
  const data=await Product.find();
  res.json(data);
}

export const categorywisedata = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Product.find({ category: id });

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch category products",
    });
  }
};

export const additemtocart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, size } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const priceObj = product.pricing.find((p) => p.size === size);
    if (!priceObj) {
      return res.status(400).json({ message: "Invalid size" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.size === size
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        product: productId,
        size,
        price: priceObj.price,
        quantity: 1,
      });
    }

    await cart.save();

    res.json({ message: "Item added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Add to cart failed" });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId })
      .populate("items.product"); // optional but recommended

    if (!cart) {
      return res.json({ items: [], totalsum: 0 });
    }

    const totalsum = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    res.json({
      items: cart.items,
      totalsum,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};
