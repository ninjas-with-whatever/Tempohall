var express = require('express');
const { exec } = require("child_process");
var config = require('../config');
var router = express.Router();
var { setAccessToken } = require('../spotify-agent');

const { clientId, authorizationToken } = config
const scopes = 'user-read-private user-read-email user-read-currently-playing user-read-playback-state';
const redirectUrl = encodeURIComponent('http://raspberrypi.local:3000/callback')

router.get('/login', (_, res) => {
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + clientId +
    '&scope=' + encodeURIComponent(scopes) +
    '&redirect_uri=' + redirectUrl);
});

router.get('/callback', (req, res) => {
  const { code } = req.query

  exec(`curl -H "Authorization: Basic ${authorizationToken}" -d grant_type=authorization_code -d code=${code} -d redirect_uri=${redirectUrl} https://accounts.spotify.com/api/token`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    
    const { access_token } = JSON.parse(stdout)

    setAccessToken(access_token)

    res.redirect('/welcome')
  });
});

router.get('/welcome', (req, res) => {
  res.end('Logged in successfuly')
});

module.exports = router;
