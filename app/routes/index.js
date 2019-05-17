import express from 'express';
import contactController from '../controllers/contacts';

const router = express.Router();

router.get("/", (req, res) => res.send("This SMS management App, refer docs on how to use."));

router.get('/contacts', contactController.list);


module.exports = router;
