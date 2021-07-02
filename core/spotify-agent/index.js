const SpotifyWebApi = require('spotify-web-api-node');
const { clientId, clientSecret } = require('../config');
const store = require('./store')

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: 'http://raspberrypi.local:3000/callback'
});

const setAccessToken = (token) => {
  store.setState({ accessToken: token })
  spotifyApi.setAccessToken(token)
  setup()
}

const getCurrentPlayingTrack = () => {
  spotifyApi.getMe()
    .then(function(data) {
      console.log('Some information about the authenticated user', data.body);
    }, function(err) {
      console.log('Something went wrong!', err);
    });
}

const setup = () => {
  setInterval(() => {
    getCurrentPlayingTrack()
  }, 2000)
}

if (store.state.accessToken) {
  setAccessToken(store.state.accessToken)
}

module.exports = {
  setAccessToken
}