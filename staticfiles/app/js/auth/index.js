/**
 * Index file for the auth module.
 */

'use strict';

var module = require('angular').module('App');

/**
 * Controllers
 * */
module.controller('LoginController', ['$scope', 'AuthenticationService', require('./controllers/LoginController')]);

/**
 * Services
 * */
module.factory('AuthenticationService', [
    '$timeout', 'AuthenticationStore', 'APITokenAuthService'
    ,'APITokenRefreshService', 'APITokenVerifyService',
    require('./services/AuthenticationService')]);
module.factory('AuthenticationStore', ['store', require('./services/AuthenticationStore')]);
module.factory('APITokenAuthService', ['Restangular', require('./services/APITokenAuthService')]);
module.factory('APITokenVerifyService', ['Restangular', require('./services/APITokenVerifyService')]);
module.factory('APITokenRefreshService', ['Restangular', require('./services/APITokenRefreshService')]);