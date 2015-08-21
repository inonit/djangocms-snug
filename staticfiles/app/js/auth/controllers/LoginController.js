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
        if (_.valuesIn(credentials)) {
            AuthenticationService.login(credentials).then(function() {
                $state.go('dashboard.overview');
            }, function(reason) {
                console.log(reason);
            });
        }
    };
};
