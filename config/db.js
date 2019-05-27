const config = require('./config');

const defaultConfig = {
  database: config.database,
  username: config.username,
  password: config.password,
  host: config.host,
  dialect: config.databaseDialect
};

// Check if databaseUrl and grab postgresql addon url (heroku).
// Heroku Postgres connection string format: postgresql://[user[:password]@][netloc][:port][/dbname]
if(config.databaseUrl) {
  const splitDbUrl = config.databaseUrl.split('://');
  const dbDialect = splitDbUrl[0];
  const dbCredentials = splitDbUrl[1].split(':');
  const dbUsername = dbCredentials[0];
  const dbPasswordAndHost = dbCredentials[1].split('@');
  const dbPassword = dbPasswordAndHost[0];
  const dbHost = dbPasswordAndHost[1];
  const dbPortAndDatabase = dbCredentials[2].split('/');
  const dbPort = dbPortAndDatabase[0];
  const dbName = dbPortAndDatabase[1];

  defaultConfig.database = dbName
  defaultConfig.username = dbUsername
  defaultConfig.password = dbPassword
  defaultConfig.host = dbHost
  defaultConfig.dialect = dbDialect
  defaultConfig.port = dbPort
}

const database = {
  development: {
    ...defaultConfig,
  },
  test: {
    ...defaultConfig,
    database: 'populationtestdb',
  },
  production: {
    ...defaultConfig,
  },
};

module.exports = database;
