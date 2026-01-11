import bcrypt from "bcrypt";
import { generateRefreshToken, generatetoken } from "../GenerateToken/token.js";
import User from "../Model/User.js";
import Product from "../Model/Product.js";
// import Cart from "../Model/Cart.js";
import Session from "../Model/Session.js";
import Cart from "../Model/Cart.js";
import Wishlist from "../Model/Wishlist.js";
const isProduction = process.env.NODE_ENV === "production";
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
                message: "invalid credentials",
             })
          }

          // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({
            message: "Invalid credentials",
          });
        }
      //  Access Token
        const accesstoken=generatetoken(user);
        //  Refresh Token
        const refreshtoken=generateRefreshToken();       
              //  Save refresh token in the database.
              await Session.create({
                userId:user._id,
                refreshToken:refreshtoken,
                expiresAt:new Date(Date.now()+7*24*60*60*1000)
              })
       
  // Set cookies
  res.cookie("accessToken", accesstoken, {
    httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
    maxAge: 15 * 60 * 1000
  });

        // Store it in the cookie 
        res.cookie("refreshtoken",refreshtoken,{
         httpOnly:true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
        })
       // 3️⃣ Success
        return res.status(200).json({
          message: "Login successful",
          user:{
            name: user.name,
            email: user.email,
          }
         });
       }
catch (error) {
  console.error("Login Error:", error); // server logs only

  return res.status(500).json({
    message: "Something went wrong. Please try again."
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
    const userId = req.user.id; //particular user
    // console.log(userId);
    const { productId, size } = req.body;
    // console.log(req.body);
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    // console.log(product);
    const priceObj = product.pricing.find((p) => p.size === size);
    if (!priceObj) {
      return res.status(400).json({ message: "Invalid size" });
    }
    // console.log(priceObj);
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }
    
    // console.log(cart);
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
        quantity: 1
      });
    }

    await cart.save();

    res.json({ message: "Item added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Add to cart failed" });
  }
};

// export const getUserCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const cart = await Cart.findOne({ user: userId });
//     if (!cart) {
//       return res.json({ items: [], totalsum: 0 });
//     }

//     const totalsum = cart.items.reduce(
//       (acc, item) => acc + item.price * item.quantity,
//       0
//     );

//     res.json({
//       items: cart.items,
//       totalsum,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch cart" });
//   }
// };

export const getUserCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId })
      .populate("items.product");

    if (!cart) {
      return res.json({ items: [], totalsum: 0 });
    }

    // 🔥 REMOVE invalid items automatically
    const validItems = cart.items.filter(item => item.product);

    const totalsum = validItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    res.json({
      items: validItems,
      totalsum,
    });
  } catch (error) {
    console.error("getUserCart error:", error); // 🔥 SEE REAL ERROR
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};


// export const logout=async(req,res)=>{
//    const refreshToken = req.cookies.refreshtoken;
//    console.log(refreshToken);
//   await Session.deleteOne({ refreshToken });

//   res.clearCookie("accessToken", {
//     httpOnly: true,
//     secure: true,
//     sameSite: "none"
//   });

//   res.clearCookie("refreshtoken", {
//     httpOnly: true,
//     secure: true,
//     sameSite: "none"
//   });

//   res.json({ success: true });
// }

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshtoken;
     console.log(refreshToken);
    if (refreshToken) {
      await Session.deleteOne({ refreshToken });
    }

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 0
    });

    res.clearCookie("refreshtoken", {
      httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
      maxAge: 0
    });

    return res.status(200).json({
      message: "Logout successful"
    });

  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      message: "Logout failed"
    });
  }
};

export const getMe=async(req,res)=>{
   const user=await User.findById(req.user.id).select("-password");
   return res.status(200).json({
    user
   });
};

// export const removeFromCart=async(req,res)=>{
//    try{ 
//   const userId=req.user.id; // persons user id .
//      const { productId, size } = req.body;
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//    const priceObj = product.pricing.find((p) => p.size === size);
//     if (!priceObj) {
//       return res.status(400).json({ message: "Invalid size" });
//     }  
//     let cart = await Cart.findOne({ user: userId });// after finding product from the cart.
//     // Check their existance in the cart . 
//        const existingItem = cart.items.find(
//       (item) =>
//         item.product.toString() === productId &&
//         item.size === size
//     );
//     if(existingItem.quantity>1)
//       {
//         existingItem.quantity-=1;
//       }
//       else{
//         await cart.items.deleteOne({productId});
//       }
//      await cart.save();
    
//         res.json({ message: "Item Removed from cart ", cart });
//   } catch (error) {
//     res.status(500).json({ message: "Remove from cart failed" });
//   }
// }
export const removeFromCart=async(req,res)=>{
   try{ 
  const userId=req.user.id; // persons user id .
     const { productId, size } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
   const priceObj = product.pricing.find((p) => p.size === size);
    if (!priceObj) {
      return res.status(400).json({ message: "Invalid size" });
    }  
    let cart = await Cart.findOne({ user: userId });// after finding product from the cart.
    // Check their existance in the cart . 
       const existingItemIndex = cart.items.findIndex(
      (item) =>
        item.product.toString() === productId &&
        item.size === size
    );
    if(existingItemIndex===-1)
      {
        return res.status(404).json({ message: "Item not found in cart" });
      }
      if(cart.items[existingItemIndex].quantity>1)
      {
        cart.items[existingItemIndex].quantity -= 1;
      }
      else{
        // 🔥 FIXED LINE
      cart.items.splice(existingItemIndex, 1);
      }
          // 🔥 DELETE CART IF EMPTY
    if (cart.items.length === 0) {
      await Cart.deleteOne({ user: userId });
      return res.json({
        items: [],
        totalsum: 0,
        message: "Cart cleared",
      });
    }
    
     await cart.save();
    
        res.json({ message: "Item Removed from cart ", cart });
  } catch (error) {
    res.status(500).json({ message: "Remove from cart failed" });
  }
}

export const clearcart = async (req, res) => {
  try {
    const userId = req.user.id;

    await Cart.deleteOne({ user: userId });

    res.json({
      items: [],
      totalsum: 0,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({ message: "Failed to clear cart" });
  }
};


// export const clearcart=async(req,res)=>{
//    const userId=req.user.id; 
//    await Cart.deleteOne({user:userId});

// } 

export const addtowishlist=async(req,res)=>{
      try {
    const userId = req.user.id; //particular user
    console.log(userId);
    const { productId, size } = req.body;
    console.log(req.body);
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    console.log(product);
    const priceObj = product.pricing.find((p) => p.size === size);
    if (!priceObj) {
      return res.status(400).json({ message: "Invalid size" });
    }
    console.log(priceObj);
    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: userId, items: [] });
    }
    
    console.log(wishlist);
    const existingItem = wishlist.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.size === size
    );

    if (existingItem) {
      return res.status(200).json({message:"Item Already Added To Wishlist"});
    } else {
      wishlist.items.push({
        product: productId,
        size,
        price: priceObj.price,
      });
    }
    await wishlist.save();

    res.json({ message: "Item added to wishlist", wishlist });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Add to Wishlist failed"});
  }    
}

export const gettowishlist=async(req,res)=>{
      try {
    const userId = req.user.id;

    const wishlist = await Wishlist.findOne({ user: userId })
      .populate("items.product");

    if (!wishlist) {
      return res.json({ items: []});
    }

    // 🔥 REMOVE invalid items automatically
    const validItems = wishlist.items.filter(item => item.product);
    res.json({
      items: validItems,
    });
  } catch (error) {
    console.error("getUserwishlist error:", error); // 🔥 SEE REAL ERROR
    res.status(500).json({ message: "Failed to fetch cart" });
  }
}

// export const  removetowishlist=async(req,res)=>{
//      try{ 
//   const userId=req.user.id; // persons user id .
//      const { productId, size } = req.body;
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//    const priceObj = product.pricing.find((p) => p.size === size);
//     if (!priceObj) {
//       return res.status(400).json({ message: "Invalid size" });
//     }  
//     let wishlist = await Wishlist.findOne({ user: userId });// after finding product from the cart.
//     // Check their existance in the cart . 
//        const existingItemIndex = wishlist.items.findIndex(
//       (item) =>
//         item.product.toString() === productId &&
//         item.size === size
//     );
// if (existingItemIndex === -1) {
//   return res.status(404).json({ message: "Item not found in wishlist" });
// }
// // Wishlist has NO quantity → just remove item
// wishlist.items.splice(existingItemIndex, 1);
//           // 🔥 DELETE CART IF EMPTY
//     if (wishlist.items.length === 0) {
//       await Wishlist.deleteOne({ user: userId });
//       return res.json({
//         items: [],
//         message: "Cart cleared",
//       });
//     }
    
//      await wishlist.save();
    
//         res.json({ message: "Item Removed from cart ", wishlist });
//   } catch (error) {
//     res.status(500).json({ message: "Remove from cart failed" });
//   }
// }

export const removetowishlist = async (req, res) => {
    //  console.log(req.body);
    try {
    const userId = req.user.id; // ✅ FIXED
    console.log(userId);
    const { productId, size } = req.body;
    console.log(req.body);
    
    let wishlist = await Wishlist.findOne({ user: userId });
    
    // ✅ CHECK wishlist existence
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    console.log(wishlist);
    
    // const itemIndex = wishlist.items.findIndex(
      //   (item) =>
        //     item.productId.toString() === productId &&
    //     item.size === size
    // );

//     const itemIndex = wishlist.items.findIndex(
//   (item) => item.id.toString() === productId && item.size === size
// );

const itemIndex = wishlist.items.findIndex(
  (item) =>
    item.product.toString() === productId &&
    item.size === size
);

console.log(itemIndex);

if (itemIndex === -1) {
  return res.status(404).json({ message: "Item not found in wishlist" });
}

// ✅ Remove item
wishlist.items.splice(itemIndex, 1);

console.log(wishlist);
// ✅ Delete wishlist if empty
if (wishlist.items.length === 0) {
  await Wishlist.deleteOne({ user: userId });
  return res.json({
    items: [],
    message: "Wishlist cleared",
  });
}

console.log(wishlist);
    await wishlist.save();

    res.json({
      message: "Item removed from wishlist",
      wishlist,
    });
  } catch (error) {
    console.error("Remove wishlist error:", error);
    res.status(500).json({ message: "Remove from wishlist failed" });
  }
};

export const cleartowishlist=async(req,res)=>{ 
            try {
    const userId = req.user.id;
     console.log(userId);
     await Wishlist.deleteOne({ user: userId });
     console.log(Wishlist);
    res.json({
      items: [],
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({ message: "Failed to clear cart" });
  }
}
