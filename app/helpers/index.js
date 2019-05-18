

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
