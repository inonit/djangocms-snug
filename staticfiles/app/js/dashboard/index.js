/**
 * Index file for the main site.
 */

'use strict';

var module = require('angular').module('App');

/**
 * Controllers
 * */
module.controller('AppController', [
    '$scope', '$mdSidenav',
    require('./controllers/AppController')
]);

module.controller('TestController', ['$scope', require('./controllers/TestController')]);
