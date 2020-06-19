const UserMongo = require("../../User");
const User = require("../User");
const Article = require("../Article");

const denormalize = async (user, operation) => {
  // Delete outdated document
  await UserMongo.deleteOne({ id: user.id });
  // if not deletion operation
  if (operation !== "delete") {
    // Compute new document
    user = await User.findByPk(user.id, {
      include: [Article],
    });
    // Save document
    const doc = new UserMongo(user.toJSON());
    await doc.save();
  }
};

User.addHook("afterCreate", (user) => {
  denormalize(user, "create");
});
User.addHook("afterUpdate", (user) => {
  denormalize(user, "update");
});
User.addHook("afterDestroy", (user) => {
  denormalize(user, "delete");
});

Article.addHook("afterCreate", (article) => {
  denormalize(article.Creator);
});
Article.addHook("afterUpdate", (article) => {
  denormalize(article.Creator);
});
Article.addHook("afterDestroy", (article) => {
  denormalize(article.Creator);
});
