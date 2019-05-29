import express from 'express';
import controller from '../controllers';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');

const router = express.Router();

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

router.get('/locations', controller.listLocations);
router.post('/locations', controller.createLocations);
router.get('/locations/:name', controller.getLocationByName);
router.put('/locations/:id', controller.updateLocation);

module.exports = router;
