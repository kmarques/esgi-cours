const connection = require("../../lib/sequelize");
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Model {}

User.init(
  // Schema
  {
    lastname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Email invalid" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  // Options
  {
    sequelize: connection,
    modelName: "User",
  }
);

User.addHook("beforeCreate", async (user, options) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

User.sync({
  alter: true,
});

module.exports = User;
