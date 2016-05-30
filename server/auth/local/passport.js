var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

function localAuthenticate(User, email, password, done) {
    User.findOneAsync({
        email: email.toLowerCase()
    })
        .then(function(user) {
            if(!user){
                return done(null, false, { message: "Email não cadastrado."});
            }
            user.authenticate(password, function(authError, authenticated) {
                if(authError){
                    return done(authError);
                }
                if(!authenticated){
                    return done(null, false, { message: "Senha incorreta."});
                } else{
                    return done(null, user);
                }
            });
        })
        .catch(function(err) {
            done(err);
        });
}

function setup(User, config) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function(email, password, done) {
        return localAuthenticate(User, email, password, done);
    }));
}

module.exports = {
    setup: setup
}
