const admin = require('firebase-admin');
const serviceAccount = require('./secrects.json');

admin.initializeApp({
  credential: admin.credential.cert(),
  databaseURL: ""

});

module.exports = admin;
