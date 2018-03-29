# review-ulang-express-rest-api
hanya sekedar review ulang untuk pelajaran phase 1 hacktiv8

### API ENDPOINT
METHOD | URL | DESC
--- | --- | ---
*Still* | `renders` | **nicely**
GET | /1-n/student | Get all student with batch name
POST | /1-n/student | Create student
GET | /1-n/batch | Get all batch with student list
POST | /1-n/batch | Create batch

GET | /n-n/group | Get all group with member list
POST | /n-n/group | Create group
GET | /n-n/person | Get all person with group list
POST | /n-n/person | Create person


### Catatan catatan
* include di one to many bisa berupa array
* untuk nge include dua model yang sama, di association nya model yang satu lagi kasih 'as', jadi pas di include bisa di kasih as
