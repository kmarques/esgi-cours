const mongoose = require("mongoose");
const connect = require("../lib/db");

const UserSchema = new mongoose.Schema(
  {
    lastname: String,
    firstname: String,
    username: String,
    Articles: Array,
  },
  { collection: "Users" }
);

const Users = connect.model("Users", UserSchema);

module.exports = Users;
