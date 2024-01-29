"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = __importDefault(require("../models/user.repository"));
function authorizeUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            if (!token) {
                console.error('Token is missing');
                return res.status(401).json({ message: 'Missing token' }).end();
            }
            const decoded = jsonwebtoken_1.default.verify(token, 'secret');
            const user = yield user_repository_1.default.getUserById(decoded.user_id);
            if (user[0].id !== decoded.user_id) {
                console.error('Invalid token');
                return res.status(403).json({ message: 'Invalid token' }).end();
            }
            req.body.user = {
                id: decoded.user_id,
                username: decoded.username,
            };
            return next();
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' }).end();
        }
    });
}
exports.authorizeUser = authorizeUser;
