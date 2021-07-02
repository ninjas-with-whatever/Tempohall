const axios = require('axios')
const store = require('./store')

const call = async (url = '', { method = 'GET' } = {}) => {
  const options = {
    method,
    url: `https://api.spotify.com/v1/${url}`,
    headers: {
      'Authorization': `Bearer ${store.state.accessToken}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  }
  return await axios(options);
}

const getDevices = async () => {
  return await call('player/devices')
}

module.exports = {
  call,
  getDevices
}