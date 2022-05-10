const express = require('express');
const github = require('../helpers/github.js');
const database = require('../database');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

app.post('/repos', function (req, res) {
  console.log('get repos of ', req.body.username);
  github.getReposByUsername(req.body.username)
    .then(data => {
      // comment
      // res.send(data.length.toString());
      return database.save(data);
    })
    .then((data) => {
      console.log('Success?!');
      res.send(data.length.toString());
      res.end();
    })
    .catch(err => {
      console.log('app.post\/repos error', err);
      res.send(err);
      res.end();
    })
});

app.get('/repos', function (req, res) {

  // console.log(req.body.sortBy);
  return database.retrieve()
    .then(data => {
      res.send(data);
      res.end();
    })
    .catch(err => {
      console.log('app.get\/repos error', err);
      res.send(err);
      res.end();
    })

});

app.get('/repos/:code', function (req, res) {

  const args = req.params.code.split('@');
  return database.retrieve(args[0], args[1])
    .then(data => {
      res.send(data);
      res.end();
    })
    .catch(err => {
      console.log('app.get\/repos error', err);
      res.send(err);
      res.end();
    })

});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 1128;
}

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

