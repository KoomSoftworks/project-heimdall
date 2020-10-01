const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

let response = {
    error: false,
    code: 200,
    message: ''
};

let firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
};

firebase.initializeApp(firebaseConfig);

app.get('/api', (req, res) => {
    res.send('<h1>Working!</h1>');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/project-heimdall/index.html'));
});

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));
  
module.exports = app;
