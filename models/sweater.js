var mongoose = require('mongoose');

var sweaterSchema = new mongoose.Schema({
  name: String,
  knitter: String,
  knitterId: String,
  wearer: String,
  size: String,
  style: {
    direction: String,
    neck: String,
    shoulders: String,
    sleeveLength: String,
    shaping: String,
    length: String
  }
});

module.exports = mongoose.model('Sweater', sweaterSchema);
