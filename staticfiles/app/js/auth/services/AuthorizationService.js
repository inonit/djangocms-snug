/**
 * Authorization.
 * Keep track of user roles, groups and permissions.
 */

'use strict';

module.exports = function (AuthenticationStore) {
    var payload = AuthenticationStore.get('payload');

    var groups = function () {
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
        return payload ? payload.is_superuser : false;
    };

    var isStaff = function () {
        return payload ? payload.is_staff || payload.is_superuser : false;
    };

    var inGroup = function (group) {
        if (!payload) {
            return false;
        }
        return _.any(payload.groups, 'name', group);
    };

    var hasPerm = function (codename) {
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
        groups: groups,
        roles: roles,
        isSuperuser: isSuperuser,
        isStaff: isStaff,
        inGroup: inGroup,
        hasPerm: hasPerm
    }
};
