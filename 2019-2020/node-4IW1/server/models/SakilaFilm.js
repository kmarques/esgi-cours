const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  Category: String,
  Length: {
    type: Number,
    default: 0
  },
  Title: String
}, {
  collection: 'Sakila_films'
});

const SakilaFilm = mongoose.model('SakilaFilm', Schema);


module.exports = SakilaFilm;