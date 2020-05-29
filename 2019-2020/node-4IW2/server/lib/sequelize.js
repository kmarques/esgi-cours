const Sequelize = require("sequelize");

const connection = new Sequelize(process.env.DATABASE_URL);

connection
  .authenticate()
  .then(() => console.log("connected to PG"))
  .catch((err) => console.error(err));

module.exports = connection;
