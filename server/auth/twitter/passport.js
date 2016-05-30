var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

function setup(User, config) {
    passport.use(new TwitterStrategy({
            consumerKey: config.twitter.clientID,
            consumerSecret: config.twitter.clientSecret,
            callbackURL: config.twitter.callbackURL
        },
        function(token, tokenSecret, profile, done) {
            User.findOneAsync({
                'twitter.id_str': profile.id
            })
                .then(function(user) {
                    if(user){
                        return done(null, user);
                    }

                    user = new User({
                        name: profile.displayName,
                        username: profile.username,
                        role: 'user',
                        provider: 'twitter',
                        twitter: profile._json
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
