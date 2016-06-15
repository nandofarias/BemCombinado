'use strict'

var crypto =  require('crypto');
var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var AUTH_TYPES = ['twitter', 'facebook', 'google'];

var UserSchema = new Schema({
    name: String,
    email:{
        type: String,
        lowercase: true
    },
    phone: String,
    role: {
        type: String,
        default: 'user'
    },
    password: {
        type: String
    },
    provider: String,
    salt: String,
    facebook: {},
    twitter: {},
    google: {},
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});


UserSchema.virtual('profile')
    .get(function() {
        return {
            'name': this.name,
            'role': this.role
        }
    });

UserSchema.virtual('token')
    .get(function() {
        return {
            '_id': this._id,
            'role': this.role
        }
    });



UserSchema.path('email')
    .validate(function(value, respond) {
        var self = this;
        return this.constructor.findOneAsync({ email: value })
            .then(function (user) {
                if(user) {
                    if(self.id === user.id){
                        return respond(true);
                    }
                    return respond(false);
                }
                return respond(true);
            })
            .catch(function (err) {
                throw err;
            });
    }, 'Email já está sendo utilizado.');

var validatePresenceOf = (value) => {
    return value && value.length;
};

UserSchema.pre('save', function(next){
    var self = this;

    var now = new Date();
    this.updated_at = now;

    if(!this.created_at){
        this.created_at = now;
    }

    if(!validatePresenceOf(this.email) && AUTH_TYPES.indexOf(this.provider) === -1){
        next(new Error('Email não pode estar em branco'));
    }

    if(!validatePresenceOf(this.password) && AUTH_TYPES.indexOf(this.provider) === -1){
        next(new Error('Senha não pode estar em branco'));
    }

    this.makeSalt((saltErr, salt) => {
       if(saltErr){
           next(saltErr);
       }
        self.salt = salt;
        self.encryptPassword(self.password, (encryptErr, hashedPassword) => {
            if(encryptErr){
                next(encryptErr);
            }
            self.password = hashedPassword;
            next();
        });
    });
});

UserSchema.methods = {

    authenticate(password, callback) {
        var self = this;
        if (!callback) {
            return this.password === this.encryptPassword(password);
        }

        this.encryptPassword(password, function(err, pwdGen){
            if (err) {
                return callback(err);
            }

            if (self.password === pwdGen) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        });
    },


    makeSalt(byteSize, callback) {
        var defaultByteSize = 16;

        if (typeof arguments[0] === 'function') {
            callback = arguments[0];
            byteSize = defaultByteSize;
        } else if (typeof arguments[1] === 'function') {
            callback = arguments[1];
        }

        if (!byteSize) {
            byteSize = defaultByteSize;
        }

        if (!callback) {
            return crypto.randomBytes(byteSize).toString('base64');
        }

        return crypto.randomBytes(byteSize, function(err, salt){
            if (err) {
                callback(err);
            } else {
                callback(null, salt.toString('base64'));
            }
        });
    },


    encryptPassword(password, callback) {
        if (!password || !this.salt) {
            return null;
        }

        var defaultIterations = 10000;
        var defaultKeyLength = 256;
        var digest = 'SHA256'
        var salt = new Buffer(this.salt, 'base64');

        if (!callback) {
            return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, digest)
                .toString('base64');
        }

        return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, digest, function(err, key){
            if (err) {
                callback(err);
            } else {
                callback(null, key.toString('base64'));
            }
        });
        
    }
}

module.exports = mongoose.model('User', UserSchema);

