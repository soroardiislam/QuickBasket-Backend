import express from"express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import helmet from "helmet"
import run from "./config/db.js"

const app = express()
dotenv.config()
app.use(express.json())

app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URI,
}))
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false,
  })
);



const PORT = process.env.PORT;

app.listen(PORT, ()=>{
  console.log("Server is running port Number", PORT)
  run()
})