const conPool = require('pg')
const dotenv = require('dotenv').config()


let config = {
  user: process.env.PG_USERNAME,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
}

let connectionPool = new conPool.Pool(config);

module.exports = connectionPool; 