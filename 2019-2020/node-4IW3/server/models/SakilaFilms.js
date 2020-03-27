const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  Title: String,
  Length: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  collection: "Sakila_films"
});

const model = new mongoose.model('SakilaFilms', schema);

module.exports = model;