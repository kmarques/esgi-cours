const mongoose = require("mongoose");
const connect = require("../lib/db");

const schema = new mongoose.Schema(
  {
    lastname: String,
    firstname: String,
    username: String,
    confirmed: Boolean,
    Articles: Array,
  },
  {
    collection: "User",
  }
);

const model = connect.model("User", schema);

module.exports = model;
