'use strict'
module.exports = (sequelize, DataTypes) => {
  var batch = sequelize.define('batch', {
    name: DataTypes.STRING
  })

  batch.associate = (models) => {
    batch.hasMany(models.student)
  }

  return batch
}