const sequelize = require("../../lib/sequelize");
const { DataTypes, Model } = require("sequelize");

// Generation du model
class User extends Model {}
User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Email non valide",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: DataTypes.STRING,
    lastname: {
      type: DataTypes.STRING,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

// Schema update
User.sync({
  force: true,
})
  .then((result) => console.log(result))
  .catch((result) => console.error(result));

module.exports = User;
