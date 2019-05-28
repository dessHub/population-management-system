import express from "express";
import 'dotenv/config';
import logger from 'morgan';
import bodyParser from "body-parser";

import routes from './routes';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);
app.use("*", (req, res) => res.send("This is Locations management API, refer to docs(/api) on how to use."));

module.exports = app;
