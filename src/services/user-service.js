const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");
const bcrypt = require('bcrypt')

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

  async signIn(email, plainPassowrd) {
    try {
      //step 1:fetch user using an email
      const user =await this.userRepository.getByEmail(email);
      //step 2: compare the password
      const passwordsMatch = this.checkPassword(plainPassowrd, user.password);
      if (!passwordsMatch) {
        console.log("password does not match");
        throw { error: "Incorrect Password" };
      }
      //step 3: if password match then create a token and send to the user
      const newJWT = this.createToken({
        email: user.email,
        id: user.id
      
      });
      return newJWT;
    } catch (error) {
      console.log("somthing went wrong at signin in process");
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

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("wrong in  token validation service layer");
      throw { error };
    }
  }

  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("somthing went wrong in password comparision");
    }
  }
}

module.exports = UserService;
