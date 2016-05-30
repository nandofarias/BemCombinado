var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

function setup(User, config) {
    passport.use(new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL,
            profileFields: [
                'displayName',
                'emails'
            ]
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOneAsync({
                'facebook.id': profile.id
            })
                .then(function(user){
                    if(user){
                        return done(null, user);
                    }

                    user = new User({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        role: 'user',
                        provider: 'facebook',
                        facebook: profile._json
                    });

                    user.saveAsync()
                        .then(function(user) {
                            done(null, user);
                        })
                        .catch(function(err) {
                            done(err);
                        })

                })
                .catch(function(err) {
                    done(err);
                });
        }));
}

module.exports = {
    setup: setup
}
