import express from "express";
import cors from "cors";
import UrlRoutes from './Routes/UrlRoutes.js';
import ConnectDb from "./DatabaseConnectivity/Database.js";
import dotenv from "dotenv";
import { seedProducts } from "./seed/seedProducts.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
// Allow CORS from all origins (update with specific domains in production)

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://food-website-dun-beta.vercel.app/"
  ], // Allow all origins - update with specific domains for production
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/images", express.static("Images"));

// Database Connectivity

ConnectDb();

// ✅ Routes

app.use("/",UrlRoutes)

// ✅ Start Server

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
