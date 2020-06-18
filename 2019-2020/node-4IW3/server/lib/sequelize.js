const Sequelize = require("sequelize");

const connection = new Sequelize(process.env.DATABASE_URL, {
  /* underscored: true, timestamps: false*/
});

connection
  .authenticate()
  .then(() => console.log("connected to PG"))
  .catch((error) => console.error(error));

module.exports = connection;
