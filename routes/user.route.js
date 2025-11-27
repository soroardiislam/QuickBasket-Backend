import {Router} from "express"
import { userLogin, userLogout, UserRegister, verifyEmailController } from "../controllers/user.controllers.js"

const userRouter = Router()

userRouter.post("/register", UserRegister);
userRouter.post("/verify", verifyEmailController);
userRouter.post("/login", userLogin);
userRouter.post("/logout", userLogout);


export default userRouter;