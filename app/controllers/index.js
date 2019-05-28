import models from '../models';
import { getLocationByName, validateBody, validate, validateInteger } from '../helpers';

const { Location } = models;
let controller = {};

controller.listLocations = async(req, res) => {
  return await Location
  .findAll()
  .then((locations) => {
    if(!locations.length){
      return res.status(400).send("No locations yet!");
    }
    return res.status(200).send(locations);
  })
  .catch(error => res.status(400).send(error));
};

module.exports = controller;
