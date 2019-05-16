const config = require('./config');

const defaultConfig = {
  database: config.database,
  username: config.username,
  password: config.password,
  host: config.host,
  dialect: config.databaseDialect
};

const database = {
  development: {
    ...defaultConfig,
  },
  test: {
    ...defaultConfig,
    database: 'smstestdb',
  },
  production: {
    ...defaultConfig,
  },
};

module.exports = database;
