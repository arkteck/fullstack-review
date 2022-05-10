const mongoose = require('mongoose');
// const password = process.env.herokuPW;
const config = require('../config.js');
const password = config.herokuPW;
// mongoose.connect('mongodb://localhost/fetcher');
mongoose.connect(`mongodb+srv://arkteck:${password}@cluster0.y9iir.mongodb.net/fetcher?retryWrites=true&w=majority`);

const Promise = require('bluebird');

let repoSchema = mongoose.Schema({
  github_id: {type: Number, unique: true},
  name: String,
  username: String,
  url: String,
  description: String,
  created_at: Date,
  updated_at: Date,
  size: Number,
  stargazers: Number,
  watchers: Number,
  forks: Number,
  open_issues: Number,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {

  let mongoData = [];
  data.forEach(d => {
    let m = {};
    m.github_id = d.id;
    m.name = d.name;
    m.username = d.owner.login;
    m.url = d.html_url;
    m.description = d.description;
    m.created_at = d.created_at;
    m.updated_at = d.updated_at;
    m.size = d.size;
    m.stargazers = d.stargazers_count;
    m.watchers = d.watchers_count;
    m.forks = d.forks_count;
    m.open_issues = d.open_issues;
    mongoData.push(m);
  })

  return Repo.insertMany(mongoData, {ordered: false});
}

let retrieve = (sortBy = 'size', order = -1) => {
  const sort = {}
  sort[sortBy] = order;
  const promArr = [Repo.estimatedDocumentCount(), Repo.find({}, null, {sort, limit: 25})];
  return Promise.all(promArr);

}

module.exports.save = save;
module.exports.retrieve = retrieve;