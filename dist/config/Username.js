"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUniqueUsername = void 0;
const uuid_1 = require("uuid");
function createUniqueUsername(unique_number) {
    return `${unique_number}_${(0, uuid_1.v4)()}`;
}
exports.createUniqueUsername = createUniqueUsername;
