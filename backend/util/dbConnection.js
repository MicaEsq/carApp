const conPool = require('pg')
let config = {
  user: '',
  host: 'localhost',
  database: '',
  password: '',
  port: 5432,
}

let connectionPool = new conPool.Pool(config);

module.exports = connectionPool;