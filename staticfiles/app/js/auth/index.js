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
module.service('AuthenticationService', [require('./services/AuthenticationService')]);
module.service('APITokenAuthService', ['Restangular', require('./services/APITokenAuthService')]);
module.service('APITokenVerifyService', ['Restangular', require('./services/APITokenVerifyService')]);
module.service('APITokenRefreshService', ['Restangular', require('./services/APITokenRefreshService')]);
