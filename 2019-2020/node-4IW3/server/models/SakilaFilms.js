const mongoose = require("mongoose");
const connect = require("../lib/db");

const schema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Length: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    collection: "Sakila_films",
  }
);

const model = connect.model("SakilaFilms", schema);

module.exports = model;
