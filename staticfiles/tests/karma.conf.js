/**
 * Karma configuration for djangocms-snug application
 * */

module.exports = function (config) {
    config.set({
        basePath: '..',
        files: [
            'app/js/main.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'tests/specs/**/*.spec.js'
        ],
        frameworks: ['browserify', 'jasmine'],
        preprocessors: {
            'app/js/main.js': ['browserify'],
            'tests/specs/**/*.spec.js': ['browserify']
        },
        reporters: ['progress'],        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-browserify'
        ],
        singleRun: false,
        browserify: {
            debug: true
        }
    })
};
