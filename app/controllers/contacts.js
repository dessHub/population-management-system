import models from '../models';

let contactController = {};

contactController.list = (req, res) => {
  return models.Contact
  .findAll({
    order: ['createdAt', 'DESC'],
  })
  .then((contacts) => res.status(200).send(contacts))
  .catch(error => res.status(400).send(error));
};

module.exports = contactController;
