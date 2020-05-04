const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  code: Number,
  message: String,
  signification: String
}, {
  collection: "Http_Code"
});

const model = new mongoose.model('HttpCode', schema);

module.exports = model;