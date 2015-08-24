/**
 * Authentication.
 */

'use strict';

module.exports = function (jwtHelper, AuthenticationStore, AuthorizationService,
                           APITokenAuthService, APITokenRefreshService, APITokenVerifyService) {

    return {
        login: function (credentials) {
            return APITokenAuthService.post(credentials).then(function (response) {
                AuthorizationService.Authorize(response.token);
            });
        },
        logout: function () {
            return AuthorizationService.DeAuthorize();
        },
        refresh: function (token) {
            APITokenRefreshService.post({
                token: token
            }).then(function (response) {
                AuthorizationService.Authorize(response.token);
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
            var token = AuthenticationStore.get('token');
            return token ? jwtHelper.isTokenExpired(token) : true;
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
