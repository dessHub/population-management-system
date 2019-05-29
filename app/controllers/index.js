import pushid from 'pushid';
import sequelize from 'sequelize';
import models from '../models';
import { getLocationByName, validateBody, validateInteger } from '../helpers';

const { Location } = models;
let controller = {};

controller.listLocations = async(req, res) => {
  return await Location
  .findAll({ 
  attributes: [ 'id','name', 'males', 'females', 'parentLocation',
    [ sequelize.literal(
        'COALESCE(males, 0) + COALESCE(females, 0)'
      ), 'total_population'
    ]
  ]
})
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
      males,
      females,
      name,
      parentLocation,
     }
  } else {
    payload = {
      males,
      females,
      name
    }
  }
  const id = pushid();

  return await Location
  .create({id, ...payload})
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

// Update location
controller.updateLocation= async (req, res) => {
  const id = req.params.id;
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

  let parentLocation = parent_location;
  if(parent_location) {
    const checkParentLocation = await getLocationByName(Location, parent_location);
    if(!checkParentLocation) return res.status(400).send({"message": "Parent Location name does not exist."});
    parentLocation = checkParentLocation.id;
  }
  let payload = {};
  if(parentLocation){
    payload = {
      males,
      females,
      name,
      parentLocation,
     }
  } else {
    payload = {
      males,
      females,
      name
    }
  }
  return await Location.findByPk(id)
  .then(location => {
    if(location){
      return location.update(payload)
      .then(() => res.status(200).send({"message": "Updated successfully", location}))
      .catch(error => res.status(400).send(error));
    }
    return res.status(404).send({"message": `Sms with ID ${id} is not found!`});
  })
  .catch(error => res.status(404).send(error));
};

module.exports = controller;
