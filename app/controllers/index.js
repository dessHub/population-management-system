import models from '../models';
import { getContactByPhone } from '../helpers';

const { Contact, Sms } = models;
let controller = {};

controller.listContacts = (req, res) => {
  return Contact
  .findAll()
  .then((contacts) => res.status(200).send(contacts))
  .catch(error => res.status(400).send(error));
};

// Get contact by Id
controller.getContactById = async (req, res) => {
 try{
  const id = req.params.id;
  const contact = await Contact.findByPk(id, {
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
    console.log("gett");
    if(contact){
      res.status(200).send(contact);
     } res.status(404).send({"message": `Contact with ID ${id} is not found!`});
       })
  .catch(error => res.status(404).send(error)); }
 catch(error){
   throw new Error(error);
 }
};

controller.createContact = (req, res) => {
  const phone = req.body.phone_number;
  const name = req.body.name;
  return Contact
  .create({
     phone,
     name,
  })
  .then(contact => res.status(201).send(contact))
  .catch(error => res.status(400).send(error));
};

controller.listSms = (req, res) => {
  return Sms
   .findAll()
   .then(sms => res.status(200).send(sms))
   .catch(error => res.status(400).send(error))
};

controller.createSms = async (req, res) => {
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
   .then(sms => res.status(201).send({"status": "Message sent", "sms": sms}))
   .catch(error => res.status(400).send(error));
}

module.exports = controller;
