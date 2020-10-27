const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const bcrypt = require('bcryptjs');

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

let db = firebase.firestore();

app.get('/api', (req, res) => {
    res.send('<h1>Working!</h1>');
});

app.post('/api/user/register', (req, res, next) => {
    const user = { 
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 42)
    };
    console.log(user);
    if (!user.name || !user.email || !user.username || !user.password) {
        response = {
            error: true,
            code: 400,
            message: 'Missing data'
        };
        res.status(400).send(response);
    } else {
        let userRef = db.collection('users').doc(user.username);
        if (userRef) {
            console.log(userRef);
        }
    }
});

app.post('/api/user/login', (req, res, next) => {

});

app.post('/api/execution', (req, res, next) => {

});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/project-heimdall/index.html'));
});

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));
  
module.exports = app;
