const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  });

let response = {
    error: false,
    code: 200,
    message: '',
    data: null
};

app.get('/api', (req, res) => {
    res.send('<h1>Working!</h1>');
});

app.post('/api/execution', (req, res, next) => {
    console.log(req.body);
    response = {
        error: false,
        code: 200,
        message: 'Executing',
        data: req.body
    };
    console.log(response);
    res.send(response);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/project-heimdall/index.html'));
});

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));
  
module.exports = app;
