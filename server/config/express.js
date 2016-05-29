'use strict';

var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var path           = require('path');
var config         = require('./environment');



module.exports = function(app) {
    var env = app.get('env');

    app.set('views', config.root + '/server/views');
    app.set('view engine', 'html');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.text());
    app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
    app.use(methodOverride());


    if('development' === env) {
        app.use(morgan('dev'));
    }

    app.set('appPath', path.join(config.root, 'client'));
    app.use(express.static(app.get('appPath')));

}
