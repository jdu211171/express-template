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
    createComment(post_id, comment, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Database_1.default.query('INSERT INTO Comment (sentence, post_id, user_id) VALUES (:sentence, :post_id, :user_id)', {
                sentence: comment,
                post_id: post_id,
                user_id: user_id
            });
        });
    }
    allComments(post_id, lastId, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return Database_1.default.query('SELECT User.username, Comment.sentence FROM Comment INNER JOIN Post ON Comment.post_id = Post.id INNER JOIN User ON Comment.user_id = User.id WHERE Post.id = :post_id ORDER BY Comment.created_at LIMIT :limit OFFSET :offset', {
                    limit: limit.toString(),
                    offset: ((lastId - 1) * limit).toString(),
                    post_id: post_id
                });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    updateComment(id, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Database_1.default.query('UPDATE Comment SET sentence = :sentence WHERE id = :id', {
                sentence: comment,
                id: id
            });
        });
    }
    deleteComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Database_1.default.query('DELETE FROM Comment WHERE id = :id', {
                id: id
            });
        });
    }
}
exports.default = new CommentRepository();
