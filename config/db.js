import mongoose from "mongoose";

const connectDB = async()=>{
try {
    await mongoose.connect(process.env.MONGOOSE_URI);
    console.log("Mongoose is Connected Succesfully")
} catch (error) {
  console.log(error)
}
}

export default connectDB;