import mongoose from "mongoose";
const ConnectDb=async()=>{
     try{
        await mongoose.connect(process.env.MONGO_URL,{
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