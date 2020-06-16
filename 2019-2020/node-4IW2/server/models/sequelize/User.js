const connection = require("../../lib/sequelize");
const { Model, DataTypes } = require("sequelize");
const Article = require("./Article");
const bcrypt = require("bcrypt");

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
    timestamps: true,
    paranoid: true,
  }
);

// Many to Many
//User.belongsToMany(Article); //=> UserArticle => User.Articles
//Article.belongsToMany(User); //=> UserArticle => Article.Users
//
//// One to One
//User.hasOne(Article); //=> User.Article
//Article.hasOne(User); //=> Article.User
//
//// MANY Users TO ONE Article
//User.belongsTo(Article); //=> User.Article
//// One Article TO MANY Users
//Article.hasMany(User); //=> Article.users

// ONE User TO MANY Articles
User.hasMany(Article); // User.Articles
// MANY Articles TO ONE User
Article.belongsTo(User, {
  as: "Creator",
}); // Article.User

User.addHook("beforeCreate", async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

module.exports = User;
