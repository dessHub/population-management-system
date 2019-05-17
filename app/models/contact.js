'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    tableName: 'contacts',
  });
  Contact.associate = function(models) {
    Contact.hasMany(models.Sms, {
      onDelete: 'CASCADE',
      foreignKey: 'sender_id',
      hooks: true
    });
    Contact.hasMany(models.Sms, {
      onDelete: 'CASCADE',
      foreignKey: 'receiver_id',
      hooks: true
    });
  };
  return Contact;
};
