'use strict'

module.exports = (sequelize, DataTypes) => {
  var group = sequelize.define('group', {
    name: DataTypes.STRING
  })

  group.associate = (models) => {
    group.belongsToMany(models.person, {
      through: 'group_person',
      as: 'memberList'
    })
  }

  return group
}