import models from '../models';
import { getContactByPhone, validateSms, validateContacts, validatePhoneNumber } from '../helpers';

const { Contact, Sms } = models;
let controller = {};

controller.listContacts = async(req, res) => {
  return await Contact
  .findAll()
  .then((contacts) => {
    if(!contacts.length){
      return res.status(400).send("No contacts yet!");
    }
    return res.status(200).send(contacts);
  })
  .catch(error => res.status(400).send(error));
};

// Get contact by Id
controller.getContactById = async (req, res) => {
  const id = req.params.id;
  return await Contact.findByPk(id, {
    include: [{
      model: Sms,
      as: 'outbox',
    },
    {
      model: Sms,
      as: 'inbox',
    }],
  })
  .then(contact => {
    if(contact){
      return res.status(200).send(contact);
    }
    return res.status(404).send({"message": `Contact with ID ${id} is not found!`});
  })
  .catch(error => res.status(404).send(error));
};

controller.createContact = async(req, res) => {
  console.log("geting here", req.body);
  const validate = validateContacts(req.body);
  if(Object.keys(validate).length){
    return res.status(400).send(validate);
  };

  const phone = req.body.phone_number;
  const name = req.body.name;
  if (!validatePhoneNumber(phone)) return res.status(400).send({"message": "phone_number should be 10 digits"});

  return await Contact
  .create({
     phone,
     name,
  })
  .then(contact => res.status(201).send({"message": "sms created successfully", contact}))
  .catch(error => res.status(400).send(error));
};

// Delete contact and associated sms
controller.deleteContact = (req, res) => {
  // check if contact exist
  // delete contact if exist
  const id = req.params.id;
  return Contact.findByPk(id)
  .then(contact => {
    if(!contact) return res.status(404).send({
      "message": `Contact with Id ${id} is not found!`
    });

    return contact.destroy()
    .then(() => res.status(404).send("Successfully deleted."))
    .catch(error => res.status(400).send(error))
  })
  .catch(error => res.status(400).send(error))
}

// Get sms by Id
controller.getSmsById= async (req, res) => {
  const id = req.params.id;
  return await Sms.findByPk(id)
  .then(sms => {
    if(sms){
      return sms.update({
        status: "Received"
      })
      .then(() => res.status(200).send(sms))
      .catch(error => res.status(400).send(error));
    }
    return res.status(404).send({"message": `Sms with ID ${id} is not found!`});
  })
  .catch(error => res.status(404).send(error));
};

controller.listSms = (req, res) => {
  return Sms
   .findAll()
   .then(sms => res.status(200).send(sms))
   .catch(error => res.status(400).send(error))
};

controller.createSms = async (req, res) => {
  const validate = validateSms(req.body);

  if(Object.keys(validate).length) {
    return res.status(400).send({"message": validate})
  }

  const { sender, receiver, message } = req.body;
  const receiverContact = await getContactByPhone(Contact, receiver)
  const senderContact = await getContactByPhone(Contact, sender);

  // Alert the user if the sender contact doesn't exist.
  if (!senderContact){
    return res.status(404).send({"message": `${sender} doesn't exist, please provide a valid sender phone number.`});
  };

  // Alert the user if the receiver contact doesn't exist.
  if (!receiverContact){
    return res.status(404).send({"message": `${receiver} doesn't exist, please provide a valid receiver phone number.`});
  };

  // Create sms
  return await Sms
   .create({
     sender_id: senderContact.id,
     receiver_id: receiverContact.id,
     message: req.body.message,
     status: "New"
   })
   .then(sms => res.status(201).send({'status': "Message sent", "sms": sms}))
   .catch(error => res.status(400).send(error));
}

// Delete sms
controller.deleteSms = (req, res) => {
  return Sms.findByPk(req.params.id)
  .then(sms => {
    if(!sms) return res.status(404).send({"message": `Sms with id ${req.params.id} doesn't exist!`});

    return sms.destroy()
    .then(() => res.status(404).send("deleted"))
    .catch(error => res.status(400).send(error));
  })
  .catch(error => res.status(400).send(error));
};

module.exports = controller;
