const connection = require("../../lib/sequelize");
const { Model, DataTypes } = require("sequelize");

class User extends Model {}

User.init(
  // Schema
  {
    lastname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "Invalid email" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  // Options Model
  {
    sequelize: connection,
    modelName: "User",
  }
);

User.sync({
  alter: true,
});

module.exports = User;
