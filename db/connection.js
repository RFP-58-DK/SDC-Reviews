const { Pool, Client } = require('pg');
const Config = require ('./config.js');

const credentials = {
  host: 'localhost',
  port: 5432,
  database: Config.database,
  user: Config.user,
  password: Config.password
};

const connection = new Pool(credentials);

module.exports = connection;