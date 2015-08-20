/**
 * Namespaced storage for authentication purposes.
 */

'use strict';

module.exports = function (store) {
    return store.getNamespacedStore('auth');
};
