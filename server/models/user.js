'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require("../helpers/hashPassword");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task);
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'username is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate : {
        isEmail : {
          args : true,
          msg : 'email has an @'
        }
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6,100],
          msg: "Password must be at least 6 characters"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (instance, opt) => {
        instance.password = hashPassword(instance.password);
      }
    }
  });
  return User;
};