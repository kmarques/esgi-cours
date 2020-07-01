const Article = require("./Article");
const UserPG = require("./User");
const UserMongo = require("../User");

const denormalizeUser = async (user) => {
  // 1 - Delete old document
  await UserMongo.deleteOne({ id: user.id });
  // 2 - Compute new document
  const result = await UserPG.findOne({
    where: {
      id: user.id,
    },
    include: [Article],
  });
  // 3 - Save new document
  const doc = new UserMongo(result);
  await doc.save();
};

module.exports = denormalizeUser;
