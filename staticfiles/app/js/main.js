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

var App = angular.module('SnugApp', [
    'ngAnimate', 'ngCookies', 'ngMaterial', 'restangular'
]).run(function ($rootScope, $cookies, Restangular) {

    Restangular.setDefaultHeaders({"X-CSRFToken": $cookies['csrftoken']});

}).config(function ($httpProvider, RestangularProvider) {

    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRequestSuffix('/');
    RestangularProvider.setDefaultHttpFields({withCredentials: true});

}).constant('version', require('../../package.json').version);
