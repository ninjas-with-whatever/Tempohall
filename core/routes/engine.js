var express = require('express');
var _ = require('lodash');
var router = express.Router();

var powerController = require("../devices/powerController");
const { getCurrentTrack } = require('../spotify-agent/requests');

const options = {
  delay: 0,
  mode: {
    right: [],
    left: []
  }
}

setInterval(() => {
  getCurrentTrack().then(({ tempo, player }) => {
    console.log(player);
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


module.exports = router;
