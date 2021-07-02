const { getDevices } = require('./requests')
const store = require('./store')

const setAccessToken = (token) => {
  store.setState({ accessToken: token })
  setup()
}

const setup = () => {
  getCurrentPlayingTrack()
}

const getCurrentPlayingTrack = async () => {
  console.log(await getDevices());
}

if (store.state.accessToken) {
  setAccessToken(store.state.accessToken)
}

module.exports = {
  setAccessToken
}