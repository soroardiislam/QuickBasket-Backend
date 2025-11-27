import {Router} from "express"
import { userLogin, userLogout, UserRegister, verifyEmailController } from "../controllers/user.controllers.js"
import auth from "../middleware/auth.js";

const userRouter = Router()

userRouter.post("/register", UserRegister);
userRouter.post("/verify", verifyEmailController);
userRouter.post("/login", userLogin);
userRouter.post("/logout", auth, userLogout);


export default userRouter;