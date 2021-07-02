const SpotifyWebApi = require('spotify-web-api-node');
const { clientId, clientSecret } = require('../config');

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: 'http://raspberrypi.local:3000/callback'
});

const getCurrentPlayingTrack = () => {
  spotifyApi.getMyDevices()
    .then(function(data) {
      console.log(data.body);
    }, function(err) {
      console.log(err);
    });
}

const setup = () => {
  setInterval(() => {
    getCurrentPlayingTrack()
  }, 2000)
}

module.exports = {
  setAccessToken: (token) => {
    spotifyApi.setAccessToken(token)
    setup()
  }
}