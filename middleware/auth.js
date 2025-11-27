const auth = async(req, res)=>{
  try {
    const token = req.cookies.accessToken || req?.header?.authorization.splite("")[1];

    console.log("token",token)
    
  } catch (error) {
    res.json({
      message: error.message || message,
      error: true
    })
  }
}