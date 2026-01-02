import dotenv from "dotenv";
import ConnectDb from "../DatabaseConnectivity/Database.js";
import Product from "../Model/Product.js";
import Products from "./productsData.js"
export const seedProducts = async () => {
  try {
    // 1️⃣ Connect to MongoDB
    await ConnectDb();

    // 2️⃣ (Optional) Clear old products
    await Product.deleteMany();

    // 3️⃣ SAVE PRODUCTS INTO DATABASE 🔥
    await Product.insertMany(Products);
    const data=await Product.find();
    // console.log(data);
    console.log("✅ Products saved into MongoDB successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Failed to save products:", error);
    process.exit(1);
  }
};

