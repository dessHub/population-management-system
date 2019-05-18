import models from '../models';

const { Contact, Sms } = models;
let contactController = {};

contactController.list = (req, res) => {
  return models.Contact
  .findAll()
  .then((contacts) => res.status(200).send(contacts))
  .catch(error => res.status(400).send(error));
};

contactController.create = (req, res) => {
  const phone = req.body.phone_number;
  const name = req.body.name;
  return models.Contact
  .create({
     phone,
     name,
  })
  .then(contact => res.status(201).send(contact))
  .catch(error => res.status(400).send(error));
};

module.exports = contactController;
