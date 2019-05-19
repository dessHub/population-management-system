

export const getContactByPhone = async (model, phone) => {
  try{
    const contact = await model.findOne({
      where: { phone }
    });
    return contact ? contact : null;
  }
  catch(error) {
    throw new Error(error);
  }
}

const validateBody = (requiredFields, payload) => {
  const errors = {}
  requiredFields.forEach(field => {
    if(!payload[field]){
      errors[field] = `error, ${field} is required`
    } else if (!payload[field].trim().length) {
      errors[field] = `error, ${field} can not be blank`
    }
  })
  return errors
}

export const validateContacts = ( payload ) => {
  const requiredFields = ['phone_number', 'name'];
  return validateBody(requiredFields, payload);
};

export const validateSms = ( payload ) => {
  const requiredFields = ['sender', 'receiver', 'message'];
  return validateBody(requiredFields, payload);
};

export const validatePhoneNumber = (phone) => {
    return phone.match(/\d/g).length===10;
};

