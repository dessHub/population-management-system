import express from 'express';
import controller from '../controllers';

const router = express.Router();

router.get('/locations', controller.listLocations);
router.post('/locations', controller.createLocations);
router.get('/locations/:name', controller.getLocationByName);
router.put('/locations/:id', controller.updateLocation);
router.delete('/locations/:id', controller.deleteLocation);

module.exports = router;
