// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var debug = require('debug')('express-example');

// Sets up the Express App
// =============================================================
var app = express();
//var PORT = process.env.PORT;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Square SDK
const SquareConnect = require('square-connect');

// Static directory
app.use(express.static("public"));



// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/order-api-routes.js")(app);
require("./routes/post-api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
//db.sequelize.sync({ force: true }).then(function() {
  //app.listen(PORT, function() {
    //console.log("App listening on PORT " + PORT);
 // });
//});


// we set the port of the app
app.set('port', process.env.PORT || 3000);


// we sync the models with our db 
// (thus creating the apropos tables)
db.sequelize.sync().then(function () {
	// set our app to listen to the port we set above
  var server = app.listen(app.get('port'), function() {
  	// then save a log of the listening to our debugger.
    debug('Express server listening on port ' + server.address().port);
  });
});
