const connection = require("../../lib/sequelize");
const User = require("./User");

connection.sync({
  alter: true,
});

module.exports = {
  connection,
  User,
};
