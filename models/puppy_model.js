const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const puppySchema = new Schema({
  name: {
    type: String,
  },
  birthYear: {
    type: String,
  },
  favoriteFood: {
    type: String,
  },
  powers: {
    type: String,
  },
  img: {
    type: String,
  },
});

const Puppy = mongoose.model('Puppy', puppySchema, 'puppys');
module.exports = Puppy;
