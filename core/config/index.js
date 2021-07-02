require('dotenv').config({ path: require('find-config')('.env') })

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET

const data = {
  clientId,
  clientSecret,
  authorizationToken: Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
  accessToken: '',
  setAccessToken(token) {
    data.accessToken = token
  }
}

module.exports = data