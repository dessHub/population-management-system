import express from "express";
import 'dotenv/config';
import logger from 'morgan';
import bodyParser from "body-parser";

import routes from './app/routes';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});

