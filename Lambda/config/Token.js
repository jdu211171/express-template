"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createToken(username, user_id) {
    const payload = {
        username: username,
        user_id: user_id,
    };
    const options = {
        expiresIn: '365d',
    };
    return jsonwebtoken_1.default.sign(payload, 'secret', options);
}
exports.createToken = createToken;
