const { getCurrentPlayingTrack } = require('./requests')
const store = require('./store')

const setAccessToken = (token) => {
  store.setState({ accessToken: token })
  setup()
}

const setup = async () => {
  setInterval(() => {
    getCurrentTrackFeatures().then(console.log)
  }, 10000)
}

if (store.state.accessToken) {
  setAccessToken(store.state.accessToken)
}

module.exports = {
  setAccessToken
}