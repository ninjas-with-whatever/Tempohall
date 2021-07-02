var express = require('express');
const { exec } = require("child_process");
var config = require('../config');
var router = express.Router();

const { clientId, authorizationToken } = config
const scopes = 'user-read-private user-read-email';
const redirectUrl = encodeURIComponent('http://raspberrypi.local:3000/callback')

router.get('/login', (_, res) => {
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + clientId +
    '&scope=' + encodeURIComponent(scopes) +
    '&redirect_uri=' + redirectUrl);
});

axios.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2))
  return request
})

router.get('/callback', (req, res) => {
  const { code } = req.query

  exec(`curl -H "Authorization: Basic ${authorizationToken}" -d grant_type=authorization_code -d code=${code} -d redirect_uri=${redirectUrl} https://accounts.spotify.com/api/token`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
});

router.get('/welcome', (req, res) => {
  res.end('WOOOHOOO')
});

module.exports = router;
