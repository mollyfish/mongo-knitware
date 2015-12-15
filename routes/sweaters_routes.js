var express = require('express');
var bodyParser = require('body-parser');
var Sweater = require(__dirname + '/../models/sweater');
var handleError = require(__dirname + '/../lib/handleServerError');
var eatAuth = require(__dirname + '/../lib/eat_auth');

var sweatersRouter = module.exports = exports = express.Router();

sweatersRouter.use(bodyParser.json());
sweatersRouter.get('/sweaters', eatAuth, function(req, res) {
  Sweater.find({wranglerId: req.user._id}, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

sweatersRouter.get('/allsweaters', function(req, res) {
  Sweater.find({}, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

sweatersRouter.post('/sweaters', eatAuth, function(req, res) {
  var newSweater = new Sweater(req.body);
  newSweater.wranglerId = req.user._id;
  newSweater.wrangler = req.user.username;
  debugger;
  newSweater.save(function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

sweatersRouter.put('/sweaters/:id', eatAuth, function(req, res) {
  var sweaterData = req.body;
  delete sweaterData._id;
  Sweater.update({_id: req.params.id}, sweaterData, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});

sweatersRouter.delete('/sweaters/:id', eatAuth, function(req, res) {
  Sweater.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});
