const Pool = require('pg').Pool;
const dbConfig = require('./config');

const pool = new Pool(dbConfig.db);

module.exports = pool;