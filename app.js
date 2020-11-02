const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
require('geckodriver');
require('chromedriver');
let fs = require('fs');
let webdriver = require('selenium-webdriver');
const tfnode = require('@tensorflow/tfjs-node');
const coco = require('@tensorflow-models/coco-ssd');
const { WebElement } = require('selenium-webdriver');

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

let driver;

app.get('/api', (req, res) => {
    res.send('<h1>Working!</h1>');
});

app.post('/api/execution', async (req, res, next) => {
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
        driver.get(path).then(async() => {
            driver.takeScreenshot().then(async(img, err) => {
                if (err) {
                    console.log(err);
                    response = {
                        error: true,
                        code: 300,
                        error: err
                    };
                    driver.quit();
                    res.send(response);
                }
                let fileName = 'C:\\heimdall\\screenshots\\screenshot';
                let finalName = fileName;
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
                        response = {
                            error: true,
                            code: 300,
                            message: 'Internal error',
                            error: err
                        };
                        driver.quit();
                        res.send(response);
                    }
                });
                Promise.all([coco.load(), fs.readFileSync(finalName)]).then((results) => {
                    const model = results[0];
                    const imgTensor = tfnode.node.decodeImage(new Uint8Array(results[1]), 3);
                    return model.detect(imgTensor);
                }).then(async (predicts) => {
                    console.log(JSON.stringify(predicts));
                    if (predicts.length == 0) {
                        response = {
                            error: false,
                            code: 202,
                            message: 'Nothing was found'
                        };
                        driver.quit();
                        res.send(response);
                    } else {
                        let matchesFound = [];
                        predicts.forEach((pred) => {
                            if (pred.class.includes(label)) {
                                matchesFound.push(pred);
                            }
                        });
                        if (matchesFound.length == 0) {
                            response = {
                                error: false,
                                code: 203,
                                message: 'There were no matches',
                                allPredictions: predicts
                            };
                            driver.quit();
                            res.send(response);
                        } else {
                            matchesFound.forEach((match) => {
                                if (match.score > 0.66) {
                                    let result = { 
                                        class: match.class,
                                        forLabel: label,
                                        score: match.score,
                                        coordinates: {
                                            x: match.bbox[0] + (match.bbox[2]/2),
                                            y: match.bbox[1] + (match.bbox[3]/2)
                                        }
                                    };
                                    results.push(result);
                                }
                            });

                            //Promise.all([driver.get(path), driver.executeScript(script)])
                            

                            driver.get(path).then(async() => {
                                results.forEach((result) => {
                                    let element = driver.executeScript('return document.elementFromPoint(arguments[0], arguments[1])',
                                    result.coordinates.x, result.coordinates.y);
                                    console.log(element);
                                    element.then((cback) => {
                                        let tagName;
                                        let path;
                                        Promise.all([cback.getTagName(), cback.getAttribute('id'), cback.getAttribute('alt'),
                                        cback.getAttribute('class'), cback.getAttribute('title')]).then(values => {
                                            tagName = values[0];
                                            path = `//${tagName}[@id='${values[1]}']`;
                                            result['xpath-id'] = path;
                                            path = `//${tagName}[@alt='${values[2]}']`;
                                            result['xpath-alt'] = path;
                                            path = `//${tagName}[@class='${values[3]}']`;
                                            result['xpath-class'] = path;
                                            path = `//${tagName}[@title='${values[4]}']`;
                                            result['xpath-title'] = path;
                                            console.log(result);
                                        });
                            
                                        
                                        // let tagPromise = cback.getTagName();
                                        // tagPromise.then((tg) => {
                                        //     tagName = tg;
                                        // });
                            
                                        // attrs.forEach((at) => {
                                        //     cback.getAttribute(at).then((txt) => {
                                        //         if(txt != null){
                                        //             path = `//${tagName}[@${at}='${txt}']`;
                                        //             console.log(path);
                                        //             result['xpath-'+at] = path;
                                        //         }
                                        //     });
                                        // });
                                    });
                                });
                                response = {
                                    error: false,
                                    code: 200,
                                    message: 'Executed correctly',
                                    data: results,
                                    allPredictions: predicts
                                };
                                //driver.quit();
                                res.send(response);                                
                            });
                        }
                    }
                })
            });
        });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/project-heimdall/index.html'));
});

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));
  
module.exports = app;
