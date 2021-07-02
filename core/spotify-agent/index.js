const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: 'fcecfc72172e4cd267473117a17cbd4d',
  clientSecret: 'a6338157c9bb5ac9c71924cb2940e1a7',
  redirectUri: 'http://www.example.com/callback'
});

const getCurrentPlayingTrack = () => {
  spotifyApi.getMyCurrentPlayingTrack()
    .then(function(data) {
      console.log('Now playing: ', data.body);
    }, function(err) {
      console.log('Something went wrong!', err);
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