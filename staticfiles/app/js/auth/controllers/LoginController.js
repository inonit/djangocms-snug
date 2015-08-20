/**
 * Handle login
 */

'use strict';

module.exports = function($scope, $state, AuthenticationService) {
    $scope.credentials = {
        username: '',
        password: ''
    };

    $scope.submit = function(credentials) {
        console.log(credentials);
        AuthenticationService.login(credentials).then(function() {
            $state.go('app.dashboard');
        }, function(reason) {
            console.log(reason);
        });
    };
};
