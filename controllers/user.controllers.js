import UserModel from "../models/user.model";
import bcrypt from "bcryptjs";


const UserRegister = async (req, res)=>{
  try {
    const {name , email, password} = req.body;

    if(!name || !email || !password){
      return res.status(400).json({
          message: "provide email, name, password",
          error : true,
          success: false
      })
    }
    
    const user = await UserModel.findOne({email})

    if (user){
      return res.json({
         message: "User already exist",
         error : true,
         success: false
      })
    }
    
    const salt =await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword
    }
    const newUser = new UserModel(payload);
    const save = await newUser.save()


  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error : true,
      success: false
    })
    
  }
}