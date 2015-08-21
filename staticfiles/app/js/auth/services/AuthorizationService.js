/**
 * Authorization.
 * Keep track of user roles, groups and permissions.
 */

'use strict';

module.exports = function (AuthenticationStore) {
    var payload = AuthenticationStore.get('payload');
    return {
        groups: function () {
            return payload ? payload.groups : [];
        },
        roles: function () {
            /**
             * Returns a list of strings with "is_staff", "is_superuser",
             * as well as all the friendly names for group permissions??.
             * */
            return [
                "Administrator",
                "Staff",
                "Can add page",
                "Can delete text",
                "etc..."
            ];
        },
        isSuperuser: function () {
            return payload ? payload.is_superuser : false;
        },
        isStaff: function () {
            return payload ? payload.is_staff : false;
        },
        inGroup: function (group) {
            if (!payload) {
                return false;
            }
            return _.any(payload.groups, 'name', group);
        },
        hasPerm: function (codename) {
            if (!payload) {
                return false;
            }
            var permissions = _.map(payload.groups, function(group) {
                return _.any(group.permissions, 'codename', codename);
            });
            permissions.push(_.any(payload.user_permissions, 'codename', codename));
            return permissions.indexOf(true) > -1;
        }
    }
};
