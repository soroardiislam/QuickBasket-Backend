import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";


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
    const save = await newUser.save();

    const verifyEmailUrl = `${process.env.FRONTEND_URI}/ verify-email?code=${save?._id}`;

    const verifyEmail = await sendEmail({
           sendTo: email,
           subject: "verify email from Binkeyit",
           html :verifyEmailTemplate({
            name,
            url: verifyEmailUrl,
           }),
    })

    return res.json({
      message: " User register successfully",
      success: true,
      data:save,
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error : true,
      success: false
    })
    
  }
}

const verifyEmailController = async (req,res)=>{
   
try {
   const {code } = req.body;

  const user = await UserModel.findOne({_id: code});

  if (!user){
    return res.status(400).json({
      message: "Invalid code",
      error: true,
      success: false,
    })
  }

  const updateUser = await UserModel.updateOne({_id:code},{verify_email: true})

  return res.json({
    message:"Email verify successfully",
    success: true,
  })
} catch (error) {
  return res.status(400).json({
    message:"Invalid code",
    error: true,
    success: false,
  })
  
}

 


}

const userLogin = async (req, res)=>{
  try {
    const {email, password}= req.body;
   
    const user = await UserModel.findOne({ email });
   
    if (!user){
      return res.status(400).json({
        message: "User not register",
        success: false,
      })
    }

    if(user.status !== "Active"){
      return res.status(400).json({
        message:"Contact the Admin",
        error: true,
        success: false
      })
    }

    const Ispassword = await bcrypt.compare(password, user.password);

    if(!Ispassword){
      return res.status(400).json({
        message: "Check your password",
        success: false,
        error: true,
      })
    }
    
    const accesstoken = await generatedAccessToken(user._id);
    const refreshtoken = await generatedRefreshToken(user._id);

    const cookiesOption ={
      httpOnly : true,
      secure: true,
      sameSite: "None"
    };

    res.cookie("accessToken", accesstoken , cookiesOption);
    res.cookie("refreshToken", refreshtoken , cookiesOption);
    
    return res.json({
      message :"User login Successfully",
      success:true,
      error: false,
      accesstoken,
      refreshtoken
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    })
    
  }
}

export{
  UserRegister,
 verifyEmailController,
 userLogin
}