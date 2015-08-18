/**
 * Jasmine tests for testing controllers in the auth module.
 */

'use strict';

describe('Authentication Controllers', function () {

    //beforeEach(require('angular').module('App'));
    beforeEach(module('App'));

    describe("LoginController", function () {
        var LoginController, scope;
        beforeEach(inject(
            function($controller, $rootScope) {
                scope = $rootScope.$new();
                LoginController = $controller('LoginController', {$scope: scope})
            }
        ));

        // Test goes here!
        it("should say hello, world!", function () {
            expect(scope).toBeDefined();
        });
    });

});
