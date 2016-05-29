'use strict';
//Dependencies
var express        = require('express')
var mongoose       = require('mongoose');
var config         = require('./config/environment')
var app            = express();

//Express Configuration
//---------------------------------
//Mongodb connection
mongoose.connect(config.mongo.uri)
mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});

//Routes
//---------------------------------
require('./config/express')(app);
require('./routes.js')(app);


//Listen
//---------------------------------
app.listen(config.port);
console.log('Server started using port: ' + config.port);
