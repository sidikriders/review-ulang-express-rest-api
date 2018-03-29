'use strict'
module.exports = (sequelize, DataTypes) => {
  var person = sequelize.define('person', {
    name: DataTypes.STRING
  })

  person.associate = (models) => {
    person.belongsToMany(models.group, {
      through: 'group_people',
      as: 'group'
    })
  }

  return person
}