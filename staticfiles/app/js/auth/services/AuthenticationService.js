/**
 * Authentication service for djangocms-snug.
 */

'use strict';

module.exports = function ($timeout, AuthenticationStore, APITokenAuthService,
                           APITokenRefreshService, APITokenVerifyService) {

    var Authorize = function (token) {
        AuthenticationStore.set('token', token);
    };
    var DeAuthorize = function () {
        AuthenticationStore.remove('token');
    };

    return {
        login: function (credentials) {
            return APITokenAuthService.post(credentials).then(function (response) {
                Authorize(response.token);
            });
        },
        logout: function () {
            return $timeout(DeAuthorize, 0, true);
        },
        refresh: function (token) {
            APITokenRefreshService.post({
                token: token
            }).then(function (response) {
                Authorize(response.token);
            });
        },
        getToken: function () {
            return AuthenticationStore.get('token');
        },
        isAuthenticated: function () {
            return AuthenticationStore.get('token') ? true : false
        },
        isValid: function () {
            var token = AuthenticationStore.get('token');
            if (token) {
                APITokenVerifyService.post({
                    token: token
                }).then(function (response) {
                    return true;
                });
            }
            return false;
        }
    }
};
