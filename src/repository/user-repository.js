const { User } = require("../models/index");
const bcrypt = require('bcrypt')
class UserRepository {

  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("wrong at repository layer");
      throw {error}
    }
  }
  
  async delete(userId) {
    try {
       await User.destroy({
        where: {
          id: userId,
        },
      });
      return true;
    } catch (error) {
      console.log("wrong at repository layer");
      throw {error}

    }
  }

  async getById(userId){
    try {
      const user  =await User.findByPk(userId, {
        attributes: ['email','id']
      });
      return user;
    } catch (error) {
      console.log("wrong at repository layer");
      throw {error}
    }
  }

   checkPassword(userInputPlainPassword,encryptedPassword){
    try {
      return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
    } catch (error) {
      console.log("somthinf=g went wrong in password comparision")
    }
  }

}

module.exports = UserRepository;
