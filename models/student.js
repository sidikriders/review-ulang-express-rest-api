'use strict';
module.exports = (sequelize, DataTypes) => {
  var student = sequelize.define('student', {
    name: DataTypes.STRING
  })

  student.associate = (models) => {
    student.belongsTo(models.batch)
  }

  return student;
};