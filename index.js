// Basic Imports
const config = require("./config.json");
const express = require("express");
const app = express();
const chalk = require('chalk');

// Backend Initialization
const backend = require('./backend.js');
backend.init(app);

// Routing
app.get('', async function(req, res) {
    backend.resetAppLocals(app);
    res.render('index.ejs');
});

app.get('/team', async function(req, res) {
    backend.resetAppLocals(app);
    res.render('team.ejs');
});

app.get('/history', async function(req, res) {
    backend.resetAppLocals(app);
    res.render('history.ejs');
});

app.get('/contact', async function(req, res) {
    backend.resetAppLocals(app);
    res.render('contact.ejs');
});

app.get('/get-involved', async function(req, res) {
    backend.resetAppLocals(app);
    res.render('get-involved.ejs');
});

app.get('/donate', async function(req, res) {
    backend.resetAppLocals(app);
    res.render('donate.ejs');
});

app.get('/reports', async function(req, res) {
    backend.resetAppLocals(app);
    res.render('reports.ejs');
});

app.get('/cookies', async function(req, res) {
    backend.resetAppLocals(app);
    res.render('cookie-policy.ejs');
});

app.get('/privacy', async function(req, res) {
    backend.resetAppLocals(app);
    res.render('privacy.ejs');
});

// MAKE SURE THIS IS LAST FOR 404 PAGE REDIRECT
app.get('/*', function(req, res){
    res.render('404.ejs');
});

// Server Initialization
app.listen(config.port)

// Rejection Handler
process.on('unhandledRejection', (err) => { 
    if(config.debugMode) console.log(chalk.red(err));
});
