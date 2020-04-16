const mongoose = require('mongoose');

connection = mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@mongo`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.MONGODB_DBNAME
})
.then(() => console.log('connected'))
.catch((e) => console.log(e));

module.exports = connection;