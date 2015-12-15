var mongoose = require('mongoose');

var sweaterSchema = new mongoose.Schema({
  name: String,
  flavor: {type: String, default: 'grizzly'},
  fishPreference: {type: String, default: 'salmons'},
  wranglerId: String
});

module.exports = mongoose.model('Sweater', sweaterSchema);
