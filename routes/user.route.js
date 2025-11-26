import {Router} from "express"
import { UserRegister } from "../controllers/user.controllers.js"

const userRouter = Router()

userRouter.post("/signup", UserRegister);


export default userRouter;