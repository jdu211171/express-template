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
class CommentRepository {
    createComment(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            const { content, postId, user_id } = comment;
            return yield Database_1.default.query('INSERT INTO Comment (sentence, post_id, user_id) VALUES (?, ?)', [content, postId, user_id]);
        });
    }
    getAllComments(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Database_1.default.query('SELECT * FROM Comment WHERE post_id = ?', [id]);
        });
    }
    updateComment(id, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            const { content } = comment;
            return yield Database_1.default.query('UPDATE Comment SET sentence = ? WHERE id = ?', [content, id]);
        });
    }
    deleteComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Database_1.default.query('DELETE FROM Comment WHERE id = ?', [id]);
        });
    }
}
exports.default = new CommentRepository();
