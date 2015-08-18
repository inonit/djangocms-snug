/**
 * Provides a Restangular service for the
 * /api/auth/api-token-verify/ endpoint.
 */

'use strict';

module.exports = function (Restangular) {
    return Restangular.service('auth/api-token-verify');
};
