/**
 * Index file for the dashboard module.
 */

'use strict';

var module = require('angular').module('App');

/**
 * Controllers
 * */

module.controller('ToolbarController', ['$rootScope', '$scope', '$mdSidenav', '$mdDialog', require('./controllers/ToolbarController')]);
module.controller('SidenavController', ['$scope', require('./controllers/SidenavController')]);

module.controller('DashboardController', ['$scope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', require('./controllers/DashboardController')]);
module.controller('DemoController', ['$timeout', '$q', require('./controllers/DemoController')]);
module.controller('ListBottomSheetController', ['$scope', '$mdBottomSheet', require('./controllers/ListBottomSheetController')]);
module.controller('DialogController', ['$scope', '$mdDialog', require('./controllers/DialogController')]);
