//gulpfile.js

'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
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

gulp.task('sass', function () {
    return gulp.src('client/assets/css/styles.sass')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('client/dist/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('client/assets/css/*.sass', ['sass']);
});

gulp.task('uglify', function() {
    gulp.src([
            'client/app/**/*.module.js',
            'client/components/**/*.module.js',
            'client/app/**/*.js',
            'client/components/**/*.js',
            '!client/**/*.spec.js'
        ])
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate({
            add: true
        }))
        .pipe(uglify())
        .pipe(gulp.dest('client/dist/js'))
});

gulp.task('uglify:watch', function () {
    gulp.watch(['client/app/**/*.js', 'client/components/**/*.js'], ['uglify']);
});

gulp.task('prod', ['uglify', 'sass']);

gulp.task('default', ['sass', 'uglify', 'nodemon', 'sass:watch', 'uglify:watch']);