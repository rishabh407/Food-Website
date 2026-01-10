import mongoose from "mongoose";
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  size: String,
  price: Number,
  quantity: {
    type: Number,
    default: 1,
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);

// import mongoose, { Mongoose } from "mongoose";
// const cartItemsSchema=new mongoose.Schema({

// })
// const cart=new mongoose.Schema({
//     user:{
//       type:mongoose.Schema.Types.ObjectId,
//       ref:"User",
//       unique:true,
// },
// items:[cartItemsSchema],
// },
// {timestamps:true}
// );
// export const Cart=mongoose.model("Cart",cart);