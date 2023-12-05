const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
require('geckodriver');
require('chromedriver');
let fs = require('fs');
let webdriver = require('selenium-webdriver');

const tfnode = require('@tensorflow/tfjs-node');
const mobilenet = require('@tensorflow-models/mobilenet');

let driver;

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

const classify = async (imagePath) => {
    console.log('reading image from ' + imagePath);
    const image = fs.readFileSync(imagePath);
    console.log('decoding image...');
    const decodedImage = tfnode.node.decodeImage(image, 3);
    console.log('loading model...');
    const model = await mobilenet.load();
    console.log('classifying...');
    const predictions = await model.classify(decodedImage);
    console.log('done.');
    return predictions;
}

app.get('/api', (req, res) => {
    res.send('<h1>Working!</h1>');
});

app.post('/api/execution', (req, res, next) => {
    console.log(req.body);
    if (!req.body.label || !req.body.url || !req.body.browser) {
        response = {
            error: true,
            code: 400,
            message: 'Missing data'
        };
        res.send(response);
    } else {
        let path = req.body.url;
        let label = req.body.label;
        let browser = req.body.browser;
        let results = [];
        driver = new webdriver.Builder().forBrowser(browser).build();
        driver.get(path).then(() => {
            driver.takeScreenshot().then((img, err) => {
                if (err) {
                    console.log(err);
                }
                let fileName = 'C:\\heimdall\\screenshots\\screenshot';
                let finalName = 'C:\\heimdall\\screenshots\\screenshot';
                let saved = false;
                for (let index = 1; !saved; index++) {
                    if (fs.existsSync(fileName+".png")) {
                        fileName = finalName + index;
                    } else {
                        finalName = fileName + '.png';
                        saved = true;
                    }
                }
                fs.writeFileSync(finalName, img, 'base64', (error) => {
                    if(error){
                        console.log(error);
                    }
                });
                classify(finalName).then((predicts) => {
                    predicts.forEach(pred => {
                        if (pred.className.includes(label)) {
                            // get pred location(pixel coordinates)
                            // navigate to page again
                            // find element by coordinates
                            // create xpath
                        }
                    });
                    response = {
                        error: false,
                        code: 200,
                        message: 'Executed correctly',
                        data: predicts
                    };
                    res.send(response);
                }).catch( err => {
                    if (err) {
                        console.log(err);
                    }
                });
            });
            driver.quit();
        });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/project-heimdall/index.html'));
});

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));
  
module.exports = app;
