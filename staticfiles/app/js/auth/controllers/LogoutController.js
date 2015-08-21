/**
 * Handle logout
 */

'use strict';

module.exports = function ($scope, $state, AuthenticationService) {
    $scope.submit = function(state) {
        AuthenticationService.logout().then(function () {
            $state.go(state);
        });
    }
};
