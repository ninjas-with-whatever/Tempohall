var express = require('express');
var router = express.Router();

const clientId = 'f9015141467d4bf2b98639ca736eef6f'
const scopes = 'user-read-private user-read-email';
const redirectUri = 'http://raspberrypi.local:3000/callback'

router.get('/login', (_, res) => {
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + clientId +
    '&scope=' + encodeURIComponent(scopes) +
    '&redirect_uri=' + encodeURIComponent(redirectUri));
});

router.get('/callback', (req, res) => {
  res.end(req)
});

module.exports = router;
