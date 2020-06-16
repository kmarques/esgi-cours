const connection = require("../../lib/sequelize");
const { Model, DataTypes } = require("sequelize");

class Article extends Model {}

Article.init(
  // Schema
  {
    title: DataTypes.STRING,
  },
  // Options Model
  {
    sequelize: connection,
    modelName: "Article",
  }
);

module.exports = Article;
