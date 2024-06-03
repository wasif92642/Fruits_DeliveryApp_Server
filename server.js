const express = require('express');
const bodyParser = require('body-parser');
const admin = require('./firebaseAdmin');
const app = express();
const cors = require('cors');

// Set up middleware
app.use(bodyParser.json());
app.use(cors()); // enable CORS for all routes

const db = admin.firestore();


// Route to create a new user





app.post('/del', async (req, res) => {
  const { email , object} = req.body;

  try {
    
    const user = await admin.auth().getUserByEmail(email);

    const uid = user.uid;
  
    admin.auth().deleteUser(uid);
    const collectionRef = db.collection('Rider');
    const docRef = collectionRef.doc(object);

    docRef.delete();


    res.status(201).send("201");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});





app.post('/users', async (req, res) => {
  const { email, password, displayName , Phone, name } = req.body;

 

 await admin.auth().createUser({
      email,
      password,
      displayName
    }).then((user)=>{
      const newCollectionRef = db.collection(`Rider`).doc(user.uid);

      newCollectionRef.set({
        name: name,
        email: email,
        password: password,
        Phone:Phone
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        
    res.status(201).send("Register");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        res.status(500).send(error);
      });
      

    }).catch((error) => {
      console.error("Error creating new user:", error);
      res.status(500).send(error);
    });

});



// Route to get data
app.get('/gg', (req, res) => {
  const collectionRef = db.collection('Rider');

  collectionRef.get().then((querySnapshot) => {
    const collectionData = [];
    querySnapshot.forEach((doc) => {
      collectionData.push({ email:doc.data().email});
    });
    res.json(collectionData);
  }).catch((error) => {
    console.log('Error getting collection data:', error);
    res.sendStatus(500);
  });
});


// Start the server
const hostname = '';

const http = require('http');
/* 
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, world!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
 */




const port = process.env.PORT || 3000;
app.listen(port,'', () => {
  console.log(`Server listening on port ${port}`);
});





