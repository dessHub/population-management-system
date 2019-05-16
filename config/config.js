require('dotenv').config();
const joi = require('joi');

const envVarsSchema = joi
   .object({
      PORT: joi.number().default(8000),
      DATABASE: joi.string().required(),
      DATABASE_USER: joi.string().required(),
      DATABASE_DIALECT: joi.string().default('postgres'),
      NODE_ENV: joi
        .string()
        .allow(['development', 'production', 'test'])
        .required(),
     PASSWORD: joi.string().default(null),
     HOST: joi.string().required(),
  })
  .unknown()
  .required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);

if (error) {
   throw new Error(`Config validation error: ${error.message}`);
 }

const config = {
  port: envVars.PORT || 8000,
  database: envVars.DATABASE,
  username: envVars.DATABASE_USER,
  databaseDialect: envVars.DATABASE_DIALECT || 'postgres',
  env: envVars.NODE_ENV || 'development',
  password: envVars.PASSWORD || null,
  host: envVars.HOST,
  };

module.exports = config;
