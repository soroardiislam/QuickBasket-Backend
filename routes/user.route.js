import {Router} from "express"
import { updateUserDetails, uploadAvatar, userLogin, userLogout, UserRegister, verifyEmailController } from "../controllers/user.controllers.js"
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = Router()

userRouter.post("/register", UserRegister);
userRouter.post("/verify", verifyEmailController);
userRouter.post("/login", userLogin);
userRouter.post("/logout", auth, userLogout);
userRouter.put("/upload-avatar", auth,upload.single('avatar'), uploadAvatar);
userRouter.put('/update-user',auth,updateUserDetails)


export default userRouter