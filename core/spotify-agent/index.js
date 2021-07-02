const store = require('./store')

const setAccessToken = (token) => {
  store.setState({ accessToken: token })
}

if (store.state.accessToken) {
  setAccessToken(store.state.accessToken)
}

module.exports = {
  setAccessToken,
}