const { where } = require("sequelize");
const { User,Role } = require("../models/index");
const bcrypt = require("bcrypt");
class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("wrong at repository layer");
      throw { error };
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
      throw { error };
    }
  }

  async getById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ["email", "id"],
      });
      return user;
    } catch (error) {
      console.log("wrong at repository layer");
      throw { error };
    }
  }

  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail
        },
      });
      return user;
    } catch (error) {
      console.log("wrong at repository layer");
      throw { error };
    }
  }

  async isAdmin(userId){
    try {
      const user = await User.findByPk(userId);
      const adminRole = await Role.findOne({
        where:{
          name: 'ADMIN'
        }
      });
      return user.hasRole(adminRole)
    
    } catch (error) {
      console.log("wrong in  token validation service layer");
      throw { error };
    }
  }



}

module.exports = UserRepository;
