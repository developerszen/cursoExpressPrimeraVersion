'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    fullname: {
      type: DataTypes.VIRTUAL,
      get() {
        return [this.getDataValue('last_name'), this.getDataValue('first_name')].join(' ');
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    timestamps: false
  });
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};