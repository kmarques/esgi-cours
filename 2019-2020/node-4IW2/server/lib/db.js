const mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@mongo`, {
  dbName: process.env.MONGODB_DBNAME,
  useNewUrlParser: true
}).then(
  result => console.log("mongo connected")
  );

  module.exports = mongoose.connection;