const axios = require('axios');
// const config = require('../config.js');
// const TOKEN = config.TOKEN;
const TOKEN = process.env.TOKEN;

let getReposByUsername = (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${TOKEN}`
    }
  };

  return axios(options)
    .then(response => {
      // console.log('axios data', response.data);
      return response.data;
    })
    .catch(err => {
      console.log('axios error', err);
    })
}

module.exports.getReposByUsername = getReposByUsername;