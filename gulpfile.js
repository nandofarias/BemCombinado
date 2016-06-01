var gulp = require('gulp');
var nodemon = require('nodemon');
var env = require('gulp-env');

gulp.task('nodemon', function() {
    nodemon({
        script: 'server/index.js'
        , ext: 'js html'
        , env: { 'NODE_ENV': 'development' }
    })
});

gulp.task('set-env', function () {
    env({
        vars: {
            FACEBOOK_ID: '1609192872732615',
            FACEBOOK_SECRET: '4301ae0ab11854cb567cdf3450b0ae90',
            TWITTER_ID: 'BDyX62NVaztgoJ2IRJ7vRNMWC',
            TWITTER_SECRET: 'TgrakP9qZ0GIIzbTRpOFOOVonM3DQDbNosypYqT3EtoiPYedpJ',
            GOOGLE_ID: '218161342051-qprqo3ssbp07k2897cs8toifod6ujvnd.apps.googleusercontent.com',
            GOOGLE_SECRET:'QSaer7Ghx6t9U2GiXXw4ay-W',
            DOMAIN:'http://localhost:3000'
        }
    })
});

gulp.task('default', ['set-env', 'nodemon'])