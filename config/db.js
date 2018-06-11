const conf      = require('./../knexfile');
const knex      = require('knex')(conf[process.env.NODE_ENV || "development"]);
const bookshelf = require('bookshelf')(knex);

bookshelf.plugin('visibility');

export default bookshelf;
