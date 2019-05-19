import express from 'express';
import controller from '../controllers';

const router = express.Router();

router.get("/", (req, res) => res.send("This SMS management App, refer docs on how to use."));

router.get('/contacts', controller.listContacts);
router.get('/contacts/:id', controller.getContactById);
router.post('/contacts', controller.createContact);

// sms endpoints
router.get('/sms', controller.listSms);
router.get('/sms/:id', controller.getSmsById);
router.post('/sms', controller.createSms);

module.exports = router;
