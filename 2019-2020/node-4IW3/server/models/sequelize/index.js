const connection = require("../../lib/sequelize");
const Article = require("./Article");
const User = require("./User");
const denormalizeUser = require("./denormalizeUser");

connection.sync({
  alter: true,
});

User.addHook("afterCreate", async (user) => {
  denormalizeUser(user);
});
User.addHook("afterUpdate", async (user) => {
  denormalizeUser(user);
});
User.addHook("afterDestroy", async (user) => {
  denormalizeUser(user);
});

Article.addHook("afterCreate", async (article) => {
  denormalizeUser(article.Creator);
});
Article.addHook("afterUpdate", async (article) => {
  denormalizeUser(article.Creator);
});
Article.addHook("afterDestroy", async (article) => {
  denormalizeUser(article.Creator);
});

module.exports = {
  connection,
  User,
  Article,
};
