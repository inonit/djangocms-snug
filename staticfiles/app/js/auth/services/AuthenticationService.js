/**
 * Authentication service for djangocms-snug.
 */

'use strict';

module.exports = function ($timeout, jwtHelper, AuthenticationStore, APITokenAuthService,
                           APITokenRefreshService, APITokenVerifyService) {

    var Authorize = function (token) {
        AuthenticationStore.set('token', token);
        AuthenticationStore.set('payload', jwtHelper.decodeToken(token));
    };
    var DeAuthorize = function () {
        AuthenticationStore.remove('token');
        AuthenticationStore.remove('payload');
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
        getTokenExpireDate: function () {
            return jwtHelper.getTokenExpirationDate(AuthenticationStore.get('token'));
        },
        getTokenPayload: function () {
            return AuthenticationStore.get('payload');
        },
        isTokenExpired: function () {
            return jwtHelper.isTokenExpired(AuthenticationStore.get('token'));
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
