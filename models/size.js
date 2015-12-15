var mongoose = require('mongoose');

var sizeSchema = new mongoose.Schema({
  label: String,
  chest: Number,
  sleeve: Number,
  upperArm: Number,
  armHole: Number,
  waist: Number,
  hips: Number,
  backLength: Number
});

module.exports = mongoose.model('Size', sizeSchema);
