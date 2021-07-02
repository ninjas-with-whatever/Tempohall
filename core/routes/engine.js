var express = require('express');
var _ = require('lodash');
var router = express.Router();

var powerController = require("../devices/powerController");

const options = {
  delay: 0,
  mode: {
    right: [],
    left: []
  }
}

router.post('/options', function (req, res, next) {
  options.delay = parseInt(req.body.delay)
  options.mode = req.body.mode;
  res.end();
});

router.post('/start', function (req, res, next) {
  powerController.start(options.delay, _.cloneDeep(options.mode));
  res.end();
});

router.post('/offset', function (req, res, next) {
  powerController.offset = req.body.offset;
  res.end();
});


module.exports = router;
