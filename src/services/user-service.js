const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("wrong at service layer");
      throw { error };
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "2d" });
      return result;
    } catch (error) {
      console.log("wrong in create token service layer");
      throw { error };
    }
  }

  verifyToken(token){
    try {
      const response = jwt.verify(token,JWT_KEY);
      return response;
    } catch (error) {
      console.log("wrong in  token validation service layer");
      throw { error };
    }
  }

}

module.exports = UserService;
