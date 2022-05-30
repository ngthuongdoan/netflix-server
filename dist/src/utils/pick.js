"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
var pick = function (object, keys) {
    return keys.reduce(function (obj, key) {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            // eslint-disable-next-line no-param-reassign
            if (key in obj) {
                obj[key] = object[key];
            }
        }
        return obj;
    }, {});
};
exports.default = pick;
