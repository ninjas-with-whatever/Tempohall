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
  spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
    function(data) {
      console.log('Artist albums', data.body);
    },
    function(err) {
      console.error(err);
    }
  );
}

const setup = () => {
  getCurrentPlayingTrack()
}


module.exports = {
  setAccessToken
}