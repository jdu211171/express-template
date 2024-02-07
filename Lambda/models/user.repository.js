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
const Database_1 = __importDefault(require("../connection/Database"));
class UsersRepository {
    createUser(username, device_token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Database_1.default.query('INSERT INTO User (username,device_token) VALUE (:username,:device_token)', {
                    username: username,
                    device_token: device_token
                });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Database_1.default.query('SELECT * FROM User WHERE id = :id', {
                    id: id
                });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    updateUser(id, username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Database_1.default.query('UPDATE User SET username = :username WHERE id = :id', {
                    id: id,
                    username: username
                });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
}
exports.default = new UsersRepository();
