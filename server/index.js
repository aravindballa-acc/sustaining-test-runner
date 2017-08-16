const express = require('express');
const app = express();
const port = 8082;

const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const Log = require('log');
const log = new Log('info');

const webpack = require('webpack');
const webpackMiddleware = require("webpack-dev-middleware");
const wpconfig = require('../webpack.config')();

const config = require('./config');

function checkConfig() {
    return new Promise((resolve, reject) => {
        const projects = config.getProjects();

        // Create project paths as needed
        Array.from(projects.keys(), id => {
            return config.getPathForSDK(id);
        }).filter((path, i, arr) => {
            return arr.indexOf(path) === i;
        }).forEach(path => {
            if (!fs.existsSync(path)) {
                log.info('Creating project path %s', path);
                shell.mkdir('-p', path);
            }
        });

        // Path for test cases
        shell.mkdir('-p', config.getTestcasePath());

        return resolve();
    });
}

app.use(webpackMiddleware(webpack(wpconfig)));
app.use(express.static(path.join(__dirname, '..', 'build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(require('./controllers'));

app.listen(port, () => {
    checkConfig().then(() => console.log(`Server running on port ${port}.`))
});