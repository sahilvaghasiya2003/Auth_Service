const UserService = require("../services/user-service");
const userService = new UserService();

const create = async (req, res) => {
  try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(200).json({
      data: response,
      success: true,
      message: "new user created successfully",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "something went wrong",
      err: error,
    });
  }
};

const signIn = async(req, res) => {
  try {
    const response = await userService.signIn(req.body.email,req.body.password);
    return res.status(200).json({
      data: response,
      success: true,
      message: "correct email and password",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "write correct email and password",
      err: error,
    });
  }
};

  const isAuthenticated = async(req,res)=>{
    try {
      const token = await req.headers['x-access-token'];
      const response = await userService.isAuthenticated(token);
      return res.status(200).json({
        data: response,
        success: true,
        message: "User is authenticate and token is valid",
        err: {},
      });   
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        data: {},
        success: false,
        message: "Invalid Token",
        err: error,
      });
    }
  }

module.exports = { create ,signIn,isAuthenticated};
