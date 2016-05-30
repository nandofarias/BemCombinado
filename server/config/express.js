'use strict';

var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var compression    = require('compression')
var errorHandler   = require('errorhandler')
var path           = require('path');
var favicon        = require('serve-favicon');
var cookieParser   = require('cookie-parser');
var passport       = require('passport');
var config         = require('./environment');




module.exports = function(app) {
    var env = app.get('env');

    app.set('views', config.root + '/server/views');
    app.set('view engine', 'html');
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(methodOverride());
    app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'client')));
    app.use(cookieParser());
    app.use(passport.initialize());

    if('development' === env) {
        app.use(morgan('dev'));
        app.use(errorHandler());
    }

}
