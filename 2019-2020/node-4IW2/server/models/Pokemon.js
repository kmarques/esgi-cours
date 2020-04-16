const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  name: String,
  url: String,
  
});

const Pokemon = mongoose.model('Pokemon', Schema);

module.exports = Pokemon;