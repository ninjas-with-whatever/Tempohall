var express = require('express');
var axios = require('axios');
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
  axios.post('https://accounts.spotify.com/api/token', {
    grant_type: 'authorization_code',
    code,
    redirect_uri: baseUri + '/welcome'
  }, {
    headers: { 'Authorization': 'Basic ' + authorizationToken }
  }).then((response) => {
    console.log(response);
    res.redirect(baseUri + '/welcome');
  }).catch((error) => {
    console.log(error);
    res.end('Error on Authentication');
  });
});

router.get('/welcome', (req, res) => {
  res.end('WOOOHOOO')
});

module.exports = router;
