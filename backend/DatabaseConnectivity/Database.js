import mongoose from "mongoose";
const ConnectDb=async()=>{
     try{
        await mongoose.connect("mongodb+srv://rk4988612_db_user:2iJjwBv3LwaJ0coV@cluster4.felyxhu.mongodb.net/",{
            "dbName":"FoodWebsiteUsers"
        })
        .then(()=>
            console.log("MongoDb connected Successfully")
         )
    }
    catch(error)
    {
      console.log("❌ MongoDB error:", error)
    }
}
export default ConnectDb;