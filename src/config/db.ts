import mongoose from "mongoose";

export async function connectToMongoDB() : Promise<void>{
    try{
      await mongoose.connect("mongodb://localhost:27017/to-do-list");
      console.log('Connected to MongoDB');
    }
    catch(err)
    {
      console.log(err);
    }
  }