/**
 * Index file for the auth module.
 */

'use strict';

var module = require('angular').module('App');

/**
 * Controllers
 * */
module.controller('LoginController', ['$scope', '$state', 'AuthenticationService', require('./controllers/LoginController')]);
module.controller('LogoutController', ['$scope', '$state', 'AuthenticationService', require('./controllers/LogoutController')]);

/**
 * Services
 * */
module.factory('AuthenticationService', [
    '$timeout', 'jwtHelper', 'AuthenticationStore', 'APITokenAuthService'
    ,'APITokenRefreshService', 'APITokenVerifyService',
    require('./services/AuthenticationService')]);
module.factory('AuthorizationService', ['AuthenticationStore', require('./services/AuthorizationService')]);

module.factory('AuthenticationStore', ['store', require('./services/AuthenticationStore')]);

module.factory('APITokenAuthService', ['Restangular', require('./services/APITokenAuthService')]);
module.factory('APITokenVerifyService', ['Restangular', require('./services/APITokenVerifyService')]);
module.factory('APITokenRefreshService', ['Restangular', require('./services/APITokenRefreshService')]);
