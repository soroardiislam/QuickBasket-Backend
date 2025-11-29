
import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import sendEmail from "../config/sendEmail.js";



const UserRegister = async (req, res)=>{
    try {
        const {name , email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message: "Please provide email, name, and password",
                error : true,
                success: false
            })
        }

        const user = await UserModel.findOne({email})

        if (user){
            return res.json({
                message: "User already exists",
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

        const verifyEmailUrl = `${process.env.FRONTEND_URI}/verify-email?code=${save?._id}`;

       
        await sendEmail({
            sendTo: email,
            subject: "Verify Email from Binkeyit",
            html :verifyEmailTemplate({
                name,
                url: verifyEmailUrl,
            }),
        });

        return res.json({
            message: "User registered successfully and verification email sent.",
            success: true,
            data:save,
        });

    } catch (error) {
      
        return res.status(500).json({
            message: error.message || "Internal Server Error during registration",
            error : true,
            success: false
        });

    }
}

const verifyEmailController = async (req,res)=>{

    try {
        const {code } = req.body;

        const user = await UserModel.findOne({_id: code});

        if (!user){
            return res.status(400).json({
                message: "Invalid code or user not found",
                error: true,
                success: false,
            })
        }

        
        const updateUser = await UserModel.updateOne({_id:code},{verify_email: true}) 

        return res.json({
            message:"Email verified successfully",
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
                message: "User not registered",
                success: false,
            })
        }

        if(user.status !== "Active"){
            return res.status(400).json({
                message:"Contact the Admin to activate your account.",
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
            message :"User logged in Successfully",
            success:true,
            error: false,
            accesstoken,
            refreshtoken
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error during login",
            success: false,
            error: true,
        })

    }
}

const userLogout = async (req, res)=>{
      try {

        const userId = req.userId;
        const cookiesOption ={
            httpOnly : true,
            secure: true, 
            sameSite: "None"
        };

        res.clearCookie("accessToken", cookiesOption);
        res.clearCookie("refreshToken", cookiesOption);

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {refresh_token: ""})

        res.json({
            message:"user Logout successfully",
            success:true

        })

        
      } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
        
      }
}



export{
    UserRegister,
    verifyEmailController,
    userLogin,
    userLogout
}