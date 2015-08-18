/**
 * Main file for bootstrapping the djangocms-snug application
 */

'use strict';

var angular = require('angular'),
    ngAnimate = require('angular.animate'),
    ngCookies = require('angular.cookies'),
    ngMaterial = require('angular.material'),
    lodash = require('lodash'),
    restangular = require('restangular'),
    uiRouter = require('ui.router');


var App = angular.module('App', [
    'ngCookies', 'ngMaterial', 'ui.router', 'restangular'

]).run(function ($rootScope, $cookies, Restangular) {

    Restangular.setDefaultHeaders({"X-CSRFToken": $cookies['csrftoken']});

}).config(function ($httpProvider, $stateProvider, $urlRouterProvider,
                    $mdThemingProvider, $mdIconProvider, RestangularProvider) {

    /**
     * Angular Material Theme configuration
     * https://material.angularjs.org/latest/#/Theming/03_configuring_a_theme
     * */
    $mdThemingProvider.alwaysWatchTheme(true);  // Always watch for theme changes!

    var customBlue = $mdThemingProvider.extendPalette('light-blue', {
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50'],
        '50': 'ffffff'
    });
    $mdThemingProvider.definePalette('customBlue', customBlue);
    $mdThemingProvider.theme('default')
        .primaryPalette('customBlue', {
            'default': '500',
            'hue-1': '50'
        })
        .accentPalette('pink');
    $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey');

    /**
     * Linking to https://github.com/google/material-design-icons/tree/master/sprites/svg-sprite
     * */
    $mdIconProvider
        //
        .iconSet('action', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-action.svg', 24)
        .iconSet('alert', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-alert.svg', 24)
        .iconSet('av', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-av.svg', 24)
        .iconSet('communication', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-communication.svg', 24)
        .iconSet('content', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-content.svg', 24)
        .iconSet('device', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-device.svg', 24)
        .iconSet('editor', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-editor.svg', 24)
        .iconSet('file', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-file.svg', 24)
        .iconSet('hardware', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-hardware.svg', 24)
        .iconSet('image', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-image.svg', 24)
        .iconSet('maps', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-maps.svg', 24)
        .iconSet('navigation', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-navigation.svg', 24)
        .iconSet('notification', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-notification.svg', 24)
        .iconSet('social', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-social.svg', 24)
        .iconSet('toggle', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-toggle.svg', 24)

        // Illustrated user icons used in the docs https://material.angularjs.org/latest/#/demo/material.components.gridList
        .iconSet('avatars', 'https://raw.githubusercontent.com/angular/material/master/docs/app/icons/avatar-icons.svg', 24)
        .defaultIconSet('https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-action.svg', 24);

    /**
     * Restangular configuration
     * */
    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRequestSuffix('/');
    RestangularProvider.setDefaultHttpFields({withCredentials: true});

    /**
     * Routing
     * */
    $urlRouterProvider.otherwise('/dashboard');
    $stateProvider
        .state('/dashboard', {
            url: '/dashboard'
            //templateUrl: 'templates/dashboard/dashboard.html'
        })
        .state('/login', {
            url: '/login'
        })
        .state('/logout', {
            url: '/logout'
        });

}).constant('version', require('../../package.json').version);

/**
 * Require app components
 * */
require('./auth');
require('./dashboard');
