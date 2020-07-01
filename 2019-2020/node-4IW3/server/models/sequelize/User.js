const connection = require("../../lib/sequelize");
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const Article = require("./Article");

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
    paranoid: true,
  }
);

User.addHook("beforeCreate", async (user, options) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

// Many USER -To-Many ARTICLE => article co-writers
// class UserArticle extends Model {}
// UserArticle.init({});
//User.belongsToMany(Article, { through: "UserArticle" }); // User.Articles
//Article.belongsToMany(User, { through: "UserArticle" }); // Article.Users
//
//// One USER -To-One ARTICLE
//User.hasOne(Article); //User.Article
//Article.hasOne(User); //Article.User
//
//// Many USER -To-One ARTICLE
//User.belongsTo(Article); // User.Article
//// One Article -To-Many User
//Article.hasMany(User); // Article.Users

// One USER -To-Many ARTICLE
User.hasMany(Article); // User.Articles
// Many Article -To-One User
//Article.belongsTo(User); // Article.User
Article.belongsTo(User, { as: "Creator" }); // Article.Creator

module.exports = User;
