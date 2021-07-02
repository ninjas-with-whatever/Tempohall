const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET

module.exports = {
  clientId,
  clientSecret,
  authorizationToken: btoa(`${clientId}:${clientSecret}`)
}