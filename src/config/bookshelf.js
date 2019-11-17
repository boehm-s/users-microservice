import _knex      from 'knex';
import _bookshelf from 'bookshelf';
import knexFile   from '../knexfile';

const nodeEnv   = process.env.NODE_ENV || 'development';
const knex      = _knex(knexFile[nodeEnv]);
const bookshelf = _bookshelf(knex);

bookshelf.plugin('visibility');
bookshelf.plugin('registry');


export default bookshelf;
