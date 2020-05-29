const mongoose = require("mongoose");
const connect = require("../lib/db");

const SakilaFilmSchema = new mongoose.Schema(
  {
    Title: String,
    Length: {
      type: Number,
      required: true,
      default: 0,
      min: 60,
    },
    Rating: String,
  },
  { collection: "Sakila_films" }
);

const SakilaFilms = connect.model("SakilaFilms", SakilaFilmSchema);

module.exports = SakilaFilms;
