/**
 * Provides a Restangular service for the
 * /api/auth/api-token-auth/ endpoint.
 */

'use strict';

module.exports = function (Restangular) {
    return Restangular.service('auth/api-token-auth');
};
