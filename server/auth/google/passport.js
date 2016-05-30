'use strict';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

function setup(User, config) {
    passport.use(new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL
    }, function(accessToken, refreshToken, profile, done) {
        User.findOneAsync({
            'google.id': profile.id
        })
            .then(function(user) {
                if(user){
                    return done(null, user);
                }

                user = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    role: 'user',
                    username: profile.emails[0].value.split('@')[0],
                    provider: 'google',
                    google: profile._json
                });
                user.saveAsync()
                    .then(function(user) {
                        done(null, user);
                    })
                    .catch(function(err) {
                        done(err);
                    });
            })
            .catch(function(err) {
                done(err);
            });
    }));
}
module.exports = {
    setup: setup
}
