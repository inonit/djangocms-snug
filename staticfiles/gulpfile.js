/**
 * Gulpfile for djangocms-snug
 */

'use strict';

var gulp = require('gulp'),
    browserify = require('browserify'),
    sourcemaps = require('gulp-sourcemaps'),
    jshint = require('gulp-jshint'),
    gulpFilter = require('gulp-filter'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('browserify-ngannotate'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream'),
    autoprefixer = require('gulp-autoprefixer');

/**
 * Prevents Gulp from crashing on error.
 * */
function keepAlive(error) {
    console.log('Error: ' + error.toString());
    console.log('WARNING: The build did *not* succeed!');
    this.emit('end');
}

/**
 * JSHint task
 * */
gulp.task('jshint', function () {
    var filter = gulpFilter([
        'app/js/*.js',
        'app/js/**/*.js',
        '!app/js/vendor/*.js',
        '!app/js/vendor/**/*.js'
    ]);
    gulp.src(['app/js/*.js', 'app/**/*.js'])
        .pipe(filter)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/**
 * Javascript task
 * */
gulp.task('compile:javascript', function () {
    var b = browserify({
        entries: 'app/js/main.js',
        debug: true,
        transform: [ngAnnotate]
    });

    return b.bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Pipeline transformations here
        .pipe(uglify()).on('error', keepAlive)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('../djangocms_snug/static/djangocms_snug/js'));
});

/**
 * Copy CSS task
 * */
gulp.task('copy:css', function () {
    // Angular Material CSS file
    gulp.src('./bower_components/angular-material/angular-material.min.css')
        .pipe(gulp.dest('../djangocms_snug/static/djangocms_snug/css'));
});

/**
 * Copy fonts task
 * */
gulp.task('copy:fonts', function () {
    gulp.src('app/fonts/**/*.{eot,svg,ttf,woff,woff2}')
        .pipe(gulp.dest('../djangocms_snug/static/djangocms_snug/fonts'));
});

/**
 * Copy images task
 * */
gulp.task('copy:images', function () {
    gulp.src('app/images/**/*.{jpg,jpeg,png,svg}')
        .pipe(gulp.dest('../djangocms_snug/static/djangocms_snug/images'));
});

/**
 * Watcher tasks
 * */
gulp.watch(['app/scss/*.scss'], ['compile:sass']);
gulp.watch(
    ['app/js/*.js', 'app/js/**/*.js', '!app/js/vendor/*.js', '!app/js/vendor/**/*.js'],
    ['jshint', 'compile:javascript']);

/**
 * Default task.
 * Watch files for changes and run actions
 * */
gulp.task('default', ['compile:javascript', 'copy:css', 'copy:fonts', 'copy:images'], function () {

});
