//gulpfile.js

'use strict';

var gulp = require('gulp');
var nodemon = require('nodemon');
var env = require('gulp-env');
var sass = require('gulp-sass');

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
            GOOGLE_ID: '391207094677-i5vkm5dejfbth9hpubm7pgu2a2f0e1at.apps.googleusercontent.com',
            GOOGLE_SECRET:'dkv8B5ZlOmOCLJKE8Q1W6m0K',
            DOMAIN:'http://localhost:3000',
            MONGOLAB_URI:  'mongodb://application:reUtCxZBsdPLop1zO3ES0k@ds023373.mlab.com:23373/bemcombinado'
        }
    })
});

gulp.task('sass', function () {
    return gulp.src('client/assets/css/styles.sass')
        .pipe(sass())
        .pipe(gulp.dest('client/assets/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('client/assets/css/*.sass', ['sass']);
});

gulp.task('default', ['set-env', 'nodemon', 'sass:watch']);