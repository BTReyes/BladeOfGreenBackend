// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================

const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');
var debug = require('debug')('express-example');

const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = 'read_products';

// Replace with HTTPS Forwarding address
const forwardingAddress = "{https://da5d4750.ngrok.io}"; 

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Square SDK
// const SquareConnect = require('square-connect');

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/order-api-routes.js")(app);
require("./routes/post-api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// we set the port of the app
app.set('port', process.env.PORT || 3000);

// we sync the models with our db 
db.sequelize.sync().then(function () {
	// set our app to listen to the port we set above
  var server = app.listen(app.get('port'), function() {
  	// then save a log of the listening to our debugger.
    debug('Express server listening on port ' + server.address().port);
  });
});



