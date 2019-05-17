'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sms = sequelize.define('Sms', {
    message: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    tableName: 'sms',
  });
  Sms.associate = function(models) {
    Sms.belongsTo(models.Contact,{
      as: 'sender',
      foreignKey:'sender_id',
      hooks:true,
    })
    Sms.belongsTo(models.Contact,{
      as: 'receiver',
      foreignKey:'receiver_id',
      hooks:true,
    })
  };
  return Sms;
};
