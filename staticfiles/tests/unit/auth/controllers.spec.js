/**
 * Jasmine tests for testing controllers in the auth module.
 */

'use strict';

describe('Authentication Controllers', function () {

    beforeEach(angular.mock.module('App'));

    describe('LoginController', function () {
        var LoginController, scope;
        beforeEach(inject(
            function ($controller, $rootScope) {
                scope = $rootScope.$new();
                LoginController = $controller('LoginController', {$scope: scope})
            }
        ));

        it('should say hello, world!', function() {
            expect(scope.hello).toBe('hello, world');
        });
    });
});
