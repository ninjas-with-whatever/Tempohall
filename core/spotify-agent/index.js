const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: 'fcecfc72172e4cd267473117a17cbd4d',
  clientSecret: 'a6338157c9bb5ac9c71924cb2940e1a7',
  redirectUri: 'http://www.example.com/callback'
});

const setup = () => {
  console.log('setup');

  spotifyApi.getMyCurrentPlayingTrack()
  .then(function(data) {
    console.log('Now playing: ', data);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
}

module.exports = {
  setAccessToken: (token) => {
    spotifyApi.setAccessToken(token)
    setup()
  }
}