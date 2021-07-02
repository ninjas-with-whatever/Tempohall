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
  return (await axios(options)).data;
}

const getDevices = async () => {
  return (await call('me/player/devices')).devices
}

const getCurrentPlayingTrack = async () => {
  return (await call('me/player'))
}

const getTrackFeatures = async (id) => {
  return (await call(`audio-features/${id}`))
}

const getCurrentTrackFeatures = async () => {
  const { item } = await getCurrentPlayingTrack();
  console.log(item);
  return {
    item,
    ...await getTrackFeatures(item.id)
  }
}

module.exports = {
  call,
  getDevices,
  getCurrentPlayingTrack,
  getTrackFeatures,
  getCurrentTrackFeatures
}