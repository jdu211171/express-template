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
const express_1 = __importDefault(require("express"));
const user_repository_1 = __importDefault(require("../models/user.repository"));
const Token_1 = require("../config/Token");
const Username_1 = require("../config/Username");
const authorization_1 = require("../middleware/authorization");
const router = express_1.default.Router();
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = (0, Username_1.createUniqueUsername)(Date.now());
        const user = yield user_repository_1.default.createUser(username, req.body.device_token);
        return res.status(200).json({
            id: user.insertId,
            username: username,
            token: (0, Token_1.createToken)(username, user.insertId)
        }).end();
    }
    catch (error) {
        return res.status(500).json({ message: error.message }).end();
    }
}));
router.put('/update', authorization_1.authorizeUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        const user = yield user_repository_1.default.updateUser(Number(req.body.user.id), username);
        return res.status(200).json({
            id: Number(req.body.user.id),
            username: username,
        }).end();
    }
    catch (error) {
        return res.status(500).json({ message: error.message }).end();
    }
}));
exports.default = router;
