/**
 * Gulpfile for djangocms-snug
 */

'use strict';

var autoprefixer = require('gulp-autoprefixer'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    gulp = require('gulp'),
    gulpFilter = require('gulp-filter'),
    jshint = require('gulp-jshint'),
    karma = require('karma'),
    ngAnnotate = require('browserify-ngannotate'),
    sass = require('gulp-sass'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    templateCache = require('gulp-angular-templatecache'),
    uglify = require('gulp-uglify');

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
        './app/js/*.js',
        './app/js/**/*.js',
        '!./app/js/vendor/*.js',
        '!./app/js/vendor/**/*.js'
    ]);
    gulp.src(['./app/js/*.js', './app/**/*.js'])
        .pipe(filter)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/**
 * Sass Task
 * Compile scss files into css
 * */
gulp.task('compile:sass', function() {
    return gulp.src(['./app/scss/*.scss', '!./app/scss/_*.scss'])
        .pipe(sass({
            errLogToConsole: true,
            precision: 8,
            imagePath: './app/images'
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'})
            .on('error', keepAlive)
        )
        .pipe(autoprefixer('last 2 versions', '> 1%', 'ie8'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('../djangocms_snug/static/djangocms_snug/css'))
});

/**
 * Compile Angular templates
 * */
gulp.task('compile:angular-templates', function () {
    gulp.src('./app/js/**/templates/*.html')
        .pipe(templateCache({
            standalone: true
        }))
        .pipe(gulp.dest('../djangocms_snug/static/djangocms_snug/js'))
});


/**
 * Javascript task
 * */
gulp.task('compile:javascript', ['jshint'], function () {
    var b = browserify({
        entries: './app/js/main.js',
        debug: true,
        transform: [ngAnnotate]
    });

    return b.bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
            // Pipeline transformations here
            //.pipe(uglify()).on('error', keepAlive)
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
    gulp.src('./app/fonts/**/*.{eot,svg,ttf,woff,woff2}')
        .pipe(gulp.dest('../djangocms_snug/static/djangocms_snug/fonts'));
});

/**
 * Copy images task
 * */
gulp.task('copy:images', function () {
    gulp.src('./app/images/**/*.{jpg,jpeg,png,svg}')
        .pipe(gulp.dest('../djangocms_snug/static/djangocms_snug/images'));
});

/**
 * Watcher tasks
 * */
gulp.watch(['./app/scss/*.scss'], ['compile:sass']);
gulp.watch(['./app/js/**/*.html'], ['compile:angular-templates']);
gulp.watch(
    ['./app/js/*.js', './app/js/**/*.js', '!./app/js/vendor/*.js', '!./app/js/vendor/**/*.js'],
    ['compile:javascript']);

/**
 * Karma test task.
 *  $ gulp test
 * */
gulp.task('test', function (done) {
    var server = new karma.Server({
        configFile: __dirname + '/tests/karma.conf.js',
        singleRun: true
    });
    return server.start();
});

/**
 * Default task.
 * Watch files for changes and run actions
 * */
gulp.task('default', [
    'compile:javascript',
    'compile:angular-templates',
    'compile:sass',
    'copy:css',
    'copy:fonts',
    'copy:images'], function () {

});
