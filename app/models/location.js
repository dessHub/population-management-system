'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    males: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    females: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: 'locations',
  });
  Location.associate = (models) => {
     Location.hasMany(Location, {as: 'Sublocations', foreignKey: 'parentLocation', hooks: true})
  };
  return Location;
};
