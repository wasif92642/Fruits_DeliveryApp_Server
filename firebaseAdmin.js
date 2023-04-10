const admin = require('firebase-admin');
const serviceAccount = require('./secrects.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vita-319b7-default-rtdb.firebaseio.com"

});

module.exports = admin;
