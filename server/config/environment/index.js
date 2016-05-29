'use strict';

var path = require ('path');
var _ = require('lodash');


var all = {
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Server port
    port: process.env.PORT || 3000,

    // Server IP
    ip: process.env.IP || '0.0.0.0',

    secrets: {
        session: 'thequickbrownfoxjumpsoverthelazydog'
    },

    facebook: {
        clientID:     process.env.FACEBOOK_ID || 'id',
        clientSecret: process.env.FACEBOOK_SECRET || 'secret',
        callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
    },

    twitter: {
        clientID:     process.env.TWITTER_ID || 'id',
        clientSecret: process.env.TWITTER_SECRET || 'secret',
        callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
    },

    google: {
        clientID:     process.env.GOOGLE_ID || 'id',
        clientSecret: process.env.GOOGLE_SECRET || 'secret',
        callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
    }

}

module.exports = _.merge(
    all,
    require('../shared'),
    require('./' + process.env.NODE_ENV + '.js') || {}
);
