import models from '../models';
import pushid from 'pushid';
import { getLocationByName, validateBody, validateInteger } from '../helpers';

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

controller.createLocations = async(req, res) => {
  const validate = validateBody(req.body);
  if(Object.keys(validate).length){
    return res.status(400).send(validate);
  };

  const males = req.body.males;
  const females = req.body.females;
  const name = req.body.name;
  const parent_location = req.body.parentLocation;
  if (!validateInteger(males)) return res.status(400).send({"message": "males should be digits"});
  if (!validateInteger(females)) return res.status(400).send({"message": "females should be digits"});

  const ifLocationExist = await getLocationByName(Location, name);

  if(ifLocationExist) return res.status(400).send({"message": "Location name already exist."});
  let parentLocation = parent_location;
  if(parent_location) {
    const checkParentLocation = await getLocationByName(Location, parent_location);
    if(!checkParentLocation) return res.status(400).send({"message": "Parent Location name does not exist."});
    parentLocation = checkParentLocation.id;
  }
  let payload = {};
  if(parentLocation){
    payload = {
      id: pushid(),
      males,
      females,
      name,
      parentLocation,
     }
  } else {
    payload = {
      id: pushid(),
      males,
      females,
      name
    }
  }

  return await Location
  .create(payload)
  .then(location => res.status(201).send({"message": "location created successfully", location}))
  .catch(error => res.status(400).send(error));
};

// Get location by Id
controller.getLocationByName = async (req, res) => {
  const name = req.params.name;
  const location = await getLocationByName(Location, name);
  if(!location) return res.status(400).send({"message": "Location name does not exist."});

  return res.status(200).send(location);
};

module.exports = controller;
