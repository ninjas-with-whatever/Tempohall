var express = require('express');
var config = require('../config');
var router = express.Router();

const { clientId, authorizationToken } = config
const scopes = 'user-read-private user-read-email';
const baseUri = 'http://raspberrypi.local:3000'

router.get('/login', (_, res) => {
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + clientId +
    '&scope=' + encodeURIComponent(scopes) +
    '&redirect_uri=' + encodeURIComponent(baseUri + '/callback'));
});

router.get('/callback', (req, res) => {
  const { code } = req.query
  
  const body = new FormData();
  body.append('grant_type', 'authorization_code')
  body.append('code', code)
  body.append('redirect_uri', baseUri + '/callback')
  
  const headers = { 'Authorization': 'Basic ' + authorizationToken }

  fetch({
    method: 'POST',
    headers,
    body,
    mode: 'no-cors'
  })
    .then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
      res.end('Error on Authentication');
    });
});

router.get('/welcome', (req, res) => {
  res.end('WOOOHOOO')
});

module.exports = router;
