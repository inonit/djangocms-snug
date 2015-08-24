/**
 * Authorization.
 * Keep track of user roles, groups and permissions.
 */

'use strict';

module.exports = function ($timeout, jwtHelper, AuthenticationStore) {

    var Authorize = function (token) {
        $timeout(function() {
            AuthenticationStore.set('token', token);
            AuthenticationStore.set('payload', jwtHelper.decodeToken(token));
        });
    };

    var DeAuthorize = function () {
        $timeout(function() {
            AuthenticationStore.remove('token');
            AuthenticationStore.remove('payload');
        });
    };

    var groups = function () {
        var payload = AuthenticationStore.get('payload');
        return payload ? payload.groups : [];
    };

    var roles = function () {
        /**
         * Returns a list of strings with "is_staff", "is_superuser",
         * as well as all the friendly names for group permissions??.
         * */

        var roles = [];

        if (isSuperuser()) {
            roles.push("Superuser")
        }
        if (isStaff()) {
            roles.push("Staff")
        }

        return roles;
    };

    var isSuperuser = function () {
        var payload = AuthenticationStore.get('payload');
        return payload ? payload.is_superuser : false;
    };

    var isStaff = function () {
        var payload = AuthenticationStore.get('payload');
        return payload ? payload.is_staff || payload.is_superuser : false;
    };

    var inGroup = function (group) {
        var payload = AuthenticationStore.get('payload');
        if (!payload) {
            return false;
        }
        return _.any(payload.groups, 'name', group);
    };

    var hasPerm = function (codename) {
        var payload = AuthenticationStore.get('payload');
        if (!payload) {
            return false;
        }
        var permissions = _.map(payload.groups, function (group) {
            return _.any(group.permissions, 'codename', codename);
        });
        permissions.push(_.any(payload.user_permissions, 'codename', codename));
        return permissions.indexOf(true) > -1;
    };

    return {
        Authorize: Authorize,
        DeAuthorize: DeAuthorize,
        groups: groups,
        roles: roles,
        isSuperuser: isSuperuser,
        isStaff: isStaff,
        inGroup: inGroup,
        hasPerm: hasPerm
    }
};
