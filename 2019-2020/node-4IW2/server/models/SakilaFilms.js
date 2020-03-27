const mongoose = require('mongoose');

const SakilaFilmSchema = new mongoose.Schema({
  Title: String,
  Length: {
    type: Number,
    required: true,
    default: 0
  },
  Rating: String
}, {collection: "Sakila_films"});

const SakilaFilms = mongoose.model('SakilaFilms', SakilaFilmSchema);

module.exports = SakilaFilms;