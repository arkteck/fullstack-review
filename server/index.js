const express = require('express');
const github = require('../helpers/github.js');
const database = require('../database');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('get repos of ', req.body.username);
  github.getReposByUsername(req.body.username)
    .then(data => {

      return database.save(data);
    })
    .then(() => {
      console.log('Success?!');
      res.end('Success?!');
    })
    .catch(err => {
      console.log('app.post\/repos error', err);
    })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  return database.retrieve()
    .then(data => {
      // console.log('RETRIEVED DATA', data);
      res.send(data);
      res.end();
    })
    .catch(err => {
      console.log('app.get\/repos error', err);
    })

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

