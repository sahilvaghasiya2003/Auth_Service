const validateUserAuth = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(500).json({
      data: {},
      success: true,
      message: "something went wrong ",
      err: "Email or password missing in the request",
    });
  }
  next();
};

const validateIsAdminRequest = (req,res,next)=>{
  if(!req.body.id){
    return res.status(400).json({
      success:false,
      data:{},
      err:"User id not give.",
      message:"Somethig went wrong"
    })
  }
  next()
}

module.exports = { validateUserAuth,validateIsAdminRequest };
