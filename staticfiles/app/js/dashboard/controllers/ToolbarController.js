/**
 * ToolbarController
 */

'use strict';

module.exports = function ($rootScope, $scope, $mdSidenav, $mdDialog) {

    /**
     * Changes the "showSearch" attribute on $rootScope in order
     * to let the entire application know if the search controller
     * is visible or not.
     * */
    $scope.toggleSearch = function (element) {
        $rootScope.showSearch = !$rootScope.showSearch;
    };

    /**
     * Toggles the side navigation bar.
     * */
    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };

    /**
     * Toggles the upper right hand settings menu.
     * */
    this.toggleSettingsMenu = function ($mdOpenMenu, event) {
        $mdOpenMenu(event);
    };
};
