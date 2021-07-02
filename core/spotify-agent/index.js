const config = require("../config")

setInterval(() => {
  console.log(config.accessToken);
}, 1000)