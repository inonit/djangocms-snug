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
    storage = require("angular.storage"),
    uiRouter = require('ui.router');


var App = angular.module('App', [
    'angular-storage', 'ngCookies', 'ngMaterial', 'ui.router', 'restangular',
    'templates'

]).config(function ($httpProvider, $stateProvider, $urlRouterProvider,
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
     * Preview: https://www.google.com/design/icons/
     * */
    $mdIconProvider
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
    RestangularProvider.setBaseUrl('/snug/api');
    RestangularProvider.setRequestSuffix('/');
    RestangularProvider.setDefaultHttpFields({withCredentials: true});

    /**
     * HTTP Interceptor which asks the user to authenticate if
     * trying to access a restricted view.
     * TODO: Make it work!
     * */
    //$httpProvider.interceptors.push(function ($q, $timeout, $injector) {
    //    var loginModal,
    //        $http,
    //        $state;
    //
    //    // Avoid `Uncaught Error: [$injector:cdep] Circular dependency found`
    //    $timeout(function() {
    //        loginModal = $injector.get('AuthenticationService').modal;
    //        $http = $injector.get('$http');
    //        $state = $injector.get('$state');
    //    });
    //
    //    return {
    //        responseError: function(reason) {
    //            if (reason.staus != 401) {
    //                return $q.reject(reason);
    //            }
    //
    //            var deferred = $q.defer();
    //
    //            loginModal().then(function() {
    //                deferred.resolve($http(reason.config));
    //            }).catch(function() {
    //                $state.go('app.map');
    //                deferred.reject(reason);
    //            });
    //
    //            return deferred.promise();
    //        }
    //    };
    //});

    /**
     * Routing
     * Good read:
     *  - https://github.com/angular-ui/ui-router/wiki/Multiple-Named-Views
     *  - http://engineering.thinknear.com/blog/2015/01/07/advanced-angular-ui-router-part-i/
     * */
    $urlRouterProvider.otherwise('/dashboard');
    $stateProvider
        .state('welcome', {
            url: '/welcome',
            data: {
                requiredLogin: false
            }
        })
        .state('dashboard', {
            abstract: true,
            url: '/dashboard',
            data: {
                requiredLogin: true
            },
            views: {
                'sidenav@': {
                    controller: 'SidenavController as ctrl',
                    templateUrl: 'dashboard/templates/dashboard.sidenav.html'
                },
                'toolbar@': {
                    controller: 'ToolbarController as ctrl',
                    templateUrl: 'dashboard/templates/dashboard.toolbar.html'
                }
            }
        })
        .state('dashboard.overview', {
            url: '',
            views: {
                '@': {
                    templateUrl: 'dashboard/templates/overview.html'
                }
            }
        })
        .state('dashboard.user-profile', {
            url: '/user-profile',
            views: {
                '@': {
                    templateUrl: 'dashboard/templates/user-profile.html'
                }
            }
        })
        .state('auth', {
            abstract: true,
            template: '<ui-view/>',
            data: {
                requiredLogin: true
            }
        })
        .state('auth.login', {
            url: '/auth/login',
            controller: 'LoginController as ctrl',
            templateUrl: 'auth/templates/login.html',
            data: {
                requiredLogin: false
            }
        })
        .state('auth.logout', {
            url: '/auth/logout',
            controller: 'LogoutController as ctrl',
            templateUrl: 'auth/templates/logout.html'
        });

}).run(function ($rootScope, $state, $cookies, Restangular, AuthenticationService) {

    Restangular.setDefaultHeaders({"X-CSRFToken": $cookies['csrftoken']});

    /**
     * Listen in to the $stateChangeStart event and check if user is
     * authorized for the requested state change. If not; redirect to
     * the login state.
     * */
    $rootScope.$on('$stateChangeStart', function (e, toState) {
        if (toState.data.requireLogin && !AuthenticationService.isAuthenticated()) {
            e.preventDefault();
            $state.go('auth.login');
        }
    });

    /**
     * If user is authenticated, set the JWT token in the request header
     * on all Restangular requests.
     * */
    Restangular.addFullRequestInterceptor(function (element, operation, route, url, headers, params) {
        if (AuthenticationService.isAuthenticated()) {
            headers.Authorization = 'JWT ' + AuthenticationService.getToken();
        }
    });

}).constant('version', require('../../package.json').version);

/**
 * Require app components
 * */
require('./auth');
require('./dashboard');
