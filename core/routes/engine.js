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
    const currentDelay = Math.floor(60 * 1000 / tempo)
    if (currentDelay !== options.delay) {
      options.delay = currentDelay;
      powerController.start(options.delay, {
        left: [
          [0.9, 0.1, 0.9, 0.1],
          [0.1, 0.1, 0.1, 0.1],
        ],
        right: [
          [0.5, 0.2, 0.2, 0.9],
          [0.5, 1, 1, 0.1],
        ]
      });
    }
  })
}, 5000)

router.post('/offset', function (req, res, next) {
  powerController.offset = req.body.offset;
  res.end();
});


module.exports = router;
