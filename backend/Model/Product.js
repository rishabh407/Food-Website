import mongoose from "mongoose";

// Sub-schema for pricing options
const pricingSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { _id: false } // prevents extra _id inside pricing array
);

// Main product schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      index: true, // faster category queries
    },

    isVegetarian: {
      type: Boolean,
      default: false,
    },

    isBestSeller: {
      type: Boolean,
      default: false,
    },

    pricing: {
      type: [pricingSchema],
      required: true,
    },

    image_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
