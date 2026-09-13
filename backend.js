// Imports
const config = require("./config.json");
const multer = require('multer');
const bodyParser = require('body-parser');
const express = require("express");
const chalk = require('chalk');
const figlet = require('figlet');
const pjson = require('./package.json');
const axios = require('axios');

// Basic Variable Setup
let projectName = 'SlowDown4Sam.org';
let storedAppVariable;

// Init Function
async function init(app, con) {
    if (Number(process.version.slice(1).split(".")[0] < 16)) throw new Error(`Node.js v16 or higher is required, Discord.JS relies on this version, please update @ https://nodejs.org`);
    var multerStorage = multer.memoryStorage(); // req.body setup
    app.use(multer({ storage: multerStorage }).any()); // req.body setup
    app.use(bodyParser.urlencoded({ extended: false })); // req.body setup
    app.use(express.json()); // req.body setup
    app.set('views', './src/views'); // setting views folder
    app.set('view engine', 'ejs'); // setting views engine
    app.use(express.static('public')); // making public folder "public"
    app.use(express.static('src/static')); // making static folder "public"
    app.use('/assets', express.static(__dirname + 'public/assets')); // creating shortcut
    app.use('/reports', express.static(__dirname + 'public/reports')); // creating shortcut
    app.use('/static', express.static(__dirname + 'src/static/assets')); // creating shortcut
    // BEGIN FANCY CONSOLE LOGGING STUFF
    figlet.text(projectName, { font: "Standard", width: 700 }, function(err, data) {
        if(err) throw err;
        let str = `${data}\n-------------------------------------------\n${projectName} is up and running on port ${config.port}!`
        console.log(chalk.bold(chalk.blue(str)));
    });
    await resetAppLocals(app); // Reset app locals to be ready for next render (do this on every page load)
};

// Keeps settings updated for next render
async function resetAppLocals(app) {
    app.locals = {
        config: config,
        packagejson: require('./package.json')
    };
    storedAppVariable = app;
};

// Module Exports
module.exports = {
    init: init,
    resetAppLocals: resetAppLocals
};
