import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

import { env } from '../../config/config';
import dbConfig from '../../config/db';

const db = {};

const dbEnv = dbConfig[env];
const basename = path.basename(__filename);

let sequelize = new Sequelize(dbEnv.database, dbEnv.username, dbEnv.password, {
   host: dbEnv.host,
   dialect: dbEnv.dialect,
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
