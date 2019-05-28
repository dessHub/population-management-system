export const getLocationByName = async (model, name) => {
  try{
    const locationObj = await model.findOne({
      where: { name }
    });
    return locationObj ? locationObj : null;
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

export const validate = ( payload ) => {
  const requiredFields = ['males', 'females', 'name'];
  return validateBody(requiredFields, payload);
};

export const validateInteger = (input) => {
    return input.match(/\d/g);
};

