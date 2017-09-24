const knex = require('knex')(require('../knexfile'));
const db = require('bookshelf')(knex);

const elasticsearch = require('elasticsearch');

db.client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

db.plugin('registry');

module.exports = db;

