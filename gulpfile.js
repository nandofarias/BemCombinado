//gulpfile.js

'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var env = require('gulp-env');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');

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
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('client/assets/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('client/assets/css/*.sass', ['sass']);
});

gulp.task('uglify', function() {
    gulp.src([
            'client/app/**/*.module.js',
            'client/components/**/*.module.js',
            'client/app/**/*.js',
            'client/components/**/*.js'
        ])
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate({
            add: true
        }))
        .pipe(uglify())
        .pipe(gulp.dest('client/dist/js'))
});

gulp.task('default', ['uglify', 'set-env', 'nodemon', 'sass:watch']);