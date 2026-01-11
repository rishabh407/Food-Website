import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true, // snapshot price
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  }
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    items: {
      type: [cartItemSchema],
      default: [],
    },
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