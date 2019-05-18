module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addConstraint(
      'contacts',
      ['phone'],
      {
        type: 'unique',
      }
    )
   },
};
