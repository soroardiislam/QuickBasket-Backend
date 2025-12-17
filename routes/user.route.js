import { Router } from "express";
import {
  forgotPasswordController,
  resetpassword,
  updateUserDetails,
  uploadAvatar,
  userLogin,
  userLogout,
  UserRegister,
  verifyEmailController,
  verifyForgotPasswordOtp,
} from "../controllers/user.controllers.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = Router();

userRouter.post("/register", UserRegister);
userRouter.post("/verify", verifyEmailController);
userRouter.post("/login", userLogin);
userRouter.post("/logout", auth, userLogout);
userRouter.put("/upload-avatar", auth, upload.single("avatar"), uploadAvatar);
userRouter.put("/update-user", auth, updateUserDetails);
userRouter.put("/forgot-password", forgotPasswordController);
userRouter.put("/verify-forgot-password-otp", verifyForgotPasswordOtp);
userRouter.put("/reset-password", resetpassword);

export default userRouter;
