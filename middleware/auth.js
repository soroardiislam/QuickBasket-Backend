import jwt from "jsonwebtoken"

const auth = async(req, res, next)=>{
  try {
    const token = req.cookies.accessToken || req?.header?.authorization.splite(" ")[1];

    if(!token){
        res.json({
          message:"Provide the Token",
          error: true,
        })
    }

    const decode =await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    if(!decode){
      res.jsone({
        message: "User are not Authorization",
        error: true
      })
    }

    req.userId = decode.id
    console.log("token",token)
 
    next()

  } catch (error) {
    res.json({
      message: error.message || message,
      error: true
    })
  }
}

export default auth ;