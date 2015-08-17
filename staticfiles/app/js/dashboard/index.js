/**
 * Index file for the main site.
 */

'use strict';

var module = require('angular').module('App');

/**
 * Controllers
 * */
module.controller('AppController', ['$scope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', require('./controllers/AppController')]);
module.controller('DemoController', ['$timeout', '$q', require('./controllers/DemoController')]);
module.controller('ListBottomSheetController', ['$scope', '$mdBottomSheet', require('./controllers/ListBottomSheetController')]);
module.controller('DialogController', ['$scope', '$mdDialog', require('./controllers/DialogController')]);
