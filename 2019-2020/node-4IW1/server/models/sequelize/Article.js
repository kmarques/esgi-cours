const sequelize = require("../../lib/sequelize");
const { DataTypes, Model } = require("sequelize");

// Generation du model
class Article extends Model {}
Article.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Article",
    paranoid: true,
  }
);

// Schema update
Article.sync({
  alter: true,
})
  .then((result) => console.log(result))
  .catch((result) => console.error(result));

module.exports = Article;
