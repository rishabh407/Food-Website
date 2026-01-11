import express from "express";
import cors from "cors";
import UrlRoutes from './Routes/UrlRoutes.js';
import ConnectDb from "./DatabaseConnectivity/Database.js";
import dotenv from "dotenv";
import { seedProducts } from "./seed/seedProducts.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://food-website-git-main-rishabh407s-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/images", express.static("Images"));


app.use("/",UrlRoutes)

const startServer=async()=>{
  try{
    // Connect Database
    await ConnectDb();
    // Auto-seed products (Only If empty)
    await seedProducts();
    // Start listening 
    app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
  }catch(error){
    console.error("❌Server failed to start",error.message);
    process.exit(1);
  }
};
startServer();