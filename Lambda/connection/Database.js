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
const promise_1 = __importDefault(require("mysql2/promise"));
class Database {
    constructor() {
        this.connect().then(() => console.log('Connection successful.'));
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.database = promise_1.default.createPool({
                    database: 'anonympost',
                    host: 'anonympost.cbvagi0jkst8.ap-northeast-1.rds.amazonaws.com',
                    user: 'admin',
                    password: 'pCfXMtW2K6ssShilCYt2',
                    port: 3306,
                    namedPlaceholders: true
                });
                console.log('Successfully created a connection pool.');
            }
            catch (error) {
                console.error('Failed to connect to the database.', error);
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.database) {
                yield this.database.end();
                console.log('Successfully disconnected from the database.');
            }
        });
    }
    query(sql, values) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [result] = yield this.database.execute(sql, values);
                return result;
            }
            catch (error) {
                console.error('Failed to execute query.', error);
                // console.log(this.database.format(sql, values))
                throw error;
            }
        });
    }
}
exports.default = new Database();
