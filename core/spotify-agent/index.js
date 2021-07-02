const { getCurrentPlayingTrack } = require('./requests')
const store = require('./store')

const setAccessToken = (token) => {
  store.setState({ accessToken: token })
  setup()
}

const setup = () => {
  setInterval(() => {
    console.log(await getCurrentPlayingTrack());
  }, 2000)
}

if (store.state.accessToken) {
  setAccessToken(store.state.accessToken)
}

module.exports = {
  setAccessToken
}