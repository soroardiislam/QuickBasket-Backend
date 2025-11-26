import {Router} from "express"
import { userLogin, UserRegister, verifyEmailController } from "../controllers/user.controllers.js"

const userRouter = Router()

userRouter.post("/register", UserRegister);
userRouter.post("/verify", verifyEmailController);
userRouter.post("/login", userLogin);


export default userRouter;