/**
 * Main file for bootstrapping the djangocms-snug application
 */

'use strict';

var angular = require('angular'),
    ngAnimate = require('angular.animate'),
    ngCookies = require('angular.cookies'),
    ngMaterial = require('angular.material'),
    lodash = require('lodash'),
    restangular = require('restangular');

var App = angular.module('App', [
    'ngCookies', 'ngMaterial', 'restangular'

]).run(function ($rootScope, $cookies, Restangular) {

    Restangular.setDefaultHeaders({"X-CSRFToken": $cookies['csrftoken']});

}).config(function ($httpProvider, $mdThemingProvider, RestangularProvider) {

    /**
     * Angular Material Theme configuration
     * https://material.angularjs.org/latest/#/Theming/03_configuring_a_theme
     * */
    $mdThemingProvider.alwaysWatchTheme(true);  // Always watch for theme changes!
    $mdThemingProvider.theme('default').primaryPalette('orange').accentPalette('deep-orange');

    /**
     * Restangular configuration
     * */
    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRequestSuffix('/');
    RestangularProvider.setDefaultHttpFields({withCredentials: true});

}).constant('version', require('../../package.json').version);

/**
 * Require app components
 * */
require('./dashboard');
