'use strict';
module.exports = (sequelize, DataTypes) => {
  var group_person = sequelize.define('group_person', {
    groupId: DataTypes.INTEGER,
    personId: DataTypes.INTEGER,
    role: DataTypes.STRING
  })

  return group_person
}