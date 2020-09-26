const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

let response = {
    error: false,
    code: 200,
    message: ''
};

app.get('/api', (req, res) => {
    res.send('<h1>Working!</h1>');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/project-heimdall/index.html'));
});

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));
  
module.exports = app;
