var express = require('express');
var _ = require('lodash');
var router = express.Router();

var powerController = require("../devices/powerController");
const { getCurrentTrackFeatures } = require('../spotify-agent/requests');

const options = {
  delay: 0,
  mode: {
    right: [],
    left: []
  }
}

setInterval(() => {
  getCurrentTrackFeatures().then(({ tempo }) => {
    options.delay = Math.floor(60 * 1000 / tempo)
    console.log(options.delay)
  })
}, 5000)

router.post('/options', async (req, res, next) => {
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
