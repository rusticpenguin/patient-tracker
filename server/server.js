const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://************s:***********@cluster0.iofno.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('patient-tracker')
    const patientsCollection = db.collection('patients')
    
    
    app.listen(4000, function() {
      console.log('listening on 3000')
    });

    app.get('/my-account', function(req, res) {
      db.collection('patients').findOne({ uid: req.header })
      .then(result => {
        res.json(result);
      })
      .catch(error => console.error(error))
    });
    
    app.put('/my-account', function(req, res) {
      db.collection('patients').findOneAndUpdate({ uid: req.uid }, req.body)
      .then(result => {
        res.json(result);
      })
      .catch(error => console.error(error))
    });
    
    app.get('/users', function(req, res) {
      db.collection('patients').find().toArray()
      .then(results => {
        res.json(results);
      })
      .catch(error => console.error(error))
    });
    
    app.delete('/delete-user', function(req, res) {
      db.collection('patients').findOneAndDelete({ uid: req.uid })
      .then(results => {
        res.json(results);
      })
      .catch(error => console.error(error))
    });
    
    app.post('/make-appointment', (req, res) => {
      patientsCollection.findOneAndUpdate( { uid: req.uid }, req.body)
      .then(result => {
        res.json('AppointmentCreated')
      })
      .catch(error => console.error(error))
    });
    
    app.put('/cancel-appointment', (req, res) => {
      patientsCollection.findOneAndUpdate( { uid: req.uid }, req.body)
      .then(result => {
        res.json('AppointmentCanceled')
      })
      .catch(error => console.error(error))
    });
    
    
  }).catch(console.error);
