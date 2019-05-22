import express from 'express';
import controller from '../controllers';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');

const router = express.Router();

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

router.get('/contacts', controller.listContacts);
router.get('/contacts/:id', controller.getContactById);
router.delete('/contacts/:id', controller.deleteContact);
router.post('/contacts', controller.createContact);

// sms endpoints
router.get('/sms', controller.listSms);
router.get('/sms/:id', controller.getSmsById);
router.delete('/sms/:id', controller.deleteSms);
router.post('/sms', controller.createSms);

module.exports = router;
