# review-ulang-express-rest-api
hanya sekedar review ulang untuk pelajaran phase 1 hacktiv8

### API ENDPOINT
METHOD | URL | DESC
--- | --- | ---
GET | /1-n/student | Get all student with batch name
POST | /1-n/student | Create student
GET | /1-n/batch | Get all batch with student list
POST | /1-n/batch | Create batch
GET | /n-n/group | Get all group with member list
POST | /n-n/group | Create group
GET | /n-n/person | Get all person with group list
POST | /n-n/person | Create person

### Step by Step
```
npm init
```
ini untuk generate `package.json`
klo mau bikin `npm start`, di `package.json` nya , di bagian `"scripts"` nya kasih tambahan `"start": "node /bin/www"` atau `"start": "nodemon /bin/www`

buat express app nya ikutin express generator aja, cuman yang kita ambil cuman `./bin/www` dan beberapa code yang di `app.js` nya
klo udah pernah pake express generator pasti paham hehe

```
sequelize init
```
ini untuk generate sequelize ORM nya, bakal ada tiga folder tambahan `config`, `models`, `migrations`. folder `seeders` nya apus aja. _at least untuk project ini kita ga perlu2 amat seeders_

### One to One
```
sequelize model:create --name student --attributes name:string,batchId:integer
```
ini untuk generate __model__ untuk student, setelah itu file nya di ubah agar jd seperti ini. Di tambah associate juga, ini jatohnya 1 student punya 1 batch
```javascript
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
```
selain __model__, command tadi juga ngebuat file __migration__
```javascript
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      batchId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: 'batches',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('students');
  }
};
```
kurang lebih file nya seperti itu, tapi untuk property _batchId_ bagian _reference_ nya di tambahin sendiri yaw

### Catatan catatan
* include di one to many bisa berupa array
* untuk nge include dua model yang sama, di association nya model yang satu lagi kasih 'as', jadi pas di include bisa di kasih as
