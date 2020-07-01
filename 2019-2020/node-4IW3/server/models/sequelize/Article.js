const connection = require("../../lib/sequelize");
const { Model, DataTypes } = require("sequelize");

class Article extends Model {}
Article.init(
  // Schema
  {
    title: DataTypes.STRING,
  },
  // Options
  {
    sequelize: connection,
    modelName: "Article",
    paranoid: true,
  }
);

module.exports = Article;
