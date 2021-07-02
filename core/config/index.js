require('dotenv').config({ path: require('find-config')('.env') })

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET

console.log(clientId)

module.exports = {
  clientId,
  clientSecret,
  authorizationToken: Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
}