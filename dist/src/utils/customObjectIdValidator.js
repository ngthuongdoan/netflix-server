"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectId = void 0;
var objectId = function (value, helpers) {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
        return helpers.message({
            messages: '"{{#label}}" must be a valid mongo id',
        });
    }
    return value;
};
exports.objectId = objectId;
