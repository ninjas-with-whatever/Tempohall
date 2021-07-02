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

axios.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2))
  return request
})

router.get('/callback', (req, res) => {
  const { code } = req.query

  axios.post('https://accounts.spotify.com/api/token', {
    grant_type: 'authorization_code',
    code,
    redirect_uri: baseUri + '/callback'
  }, {
    headers: {
      'Authorization': 'Basic ' + authorizationToken,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
    .then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.log(error.status, error.response.status);
      res.end('Error on Authentication');
    });
});

router.get('/welcome', (req, res) => {
  res.end('WOOOHOOO')
});

module.exports = router;
