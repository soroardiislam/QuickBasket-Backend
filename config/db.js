import mongoose from "mongoose";

const run = ()=>{
try {
    mongoose.connect(process.env.MONGOOSE_URI);
    console.log("Mongoose is Conect Succesfully")
} catch (error) {
  console.log(error)
}
}

export default run;