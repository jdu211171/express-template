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
class PostRepository {
    allPosts(lastId, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return Database_1.default.query(`SELECT
                p.id,p.content,DATE_FORMAT(p.created_at, '%Y-%m-%d %H:%i:%s') as created_at,
                IFNULL(DATE_FORMAT(p.updated_at, '%Y-%m-%d %H:%i:%s'), NULL) AS updated_at,
                u.id AS user_id,u.username,
                count(DISTINCT c.id) AS comment_count, count(DISTINCT r.id) AS reaction_count
            FROM 
                Post as p
            INNER JOIN 
                User AS u ON u.id = p.user_id
            LEFT JOIN 
                Comment as c ON c.post_id = p.id
            LEFT JOIN 
                Reaction as r ON r.post_id = p.id AND r.reaction_type = 1
            GROUP 
                BY p.id
            ORDER 
                BY p.created_at DESC
            LIMIT 
                :limit OFFSET :offset;`, {
                    limit: limit.toString(),
                    offset: ((lastId - 1) * limit).toString()
                });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    /*
    * id: number
    * content: string
    * user_name: string
    * user_id: number
    * created_at: Date
    * updated_at: Date
    * reactions: {
    *  reaction_type: number
    * }
    * */
    findPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return Database_1.default.query('SELECT * FROM Post JOIN User ON Post.user_id = User.id WHERE Post.id = :id', {
                    id: id
                });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    createPost(userId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return Database_1.default.query('INSERT INTO Post (content, user_id, created_at) VALUE (:content, :userId, :createdAt)', {
                    content: content,
                    userId: userId,
                    createdAt: new Date()
                });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    updatePost(id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return Database_1.default.query('UPDATE Post SET content = :content, updated_at = :updated_at WHERE id = :id', {
                    id: id,
                    content: content,
                    updated_at: new Date()
                });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return Database_1.default.query('DELETE FROM Post WHERE id = :id', {
                    id: id
                });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    getReactions(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return Database_1.default.query('SELECT reaction_type FROM Reaction WHERE post_id = :post_id', {
                    post_id: postId
                });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    addReaction(userId, postId, reactionType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return Database_1.default.query('INSERT INTO Reaction (reaction_type, user_id, post_id) VALUE (:reaction_type, :user_id, :post_id)', {
                    reaction_type: reactionType,
                    user_id: userId,
                    post_id: postId
                });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
}
exports.default = new PostRepository();
