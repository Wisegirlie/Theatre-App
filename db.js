import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Theater is connected.");
    }catch(error){
        console.log("Error conecting to database: \n" + error);
    }    
}
