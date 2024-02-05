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
                BY p.id DESC,p.created_at DESC
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
    search(lastId, limit, keyword) {
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
            WHERE 
                p.content LIKE :keyword
            GROUP 
                BY p.id
            ORDER 
                BY p.id DESC,p.created_at DESC
            LIMIT 
                :limit OFFSET :offset;`, {
                    limit: limit.toString(),
                    offset: ((lastId - 1) * limit).toString(),
                    keyword: `%${keyword}%`
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
                return Database_1.default.query(`SELECT 
                        p.id,p.content,p.user_id,
                        DATE_FORMAT(p.created_at, '%Y-%m-%d %H:%i:%s') as created_at,
                        IFNULL(DATE_FORMAT(p.updated_at, '%Y-%m-%d %H:%i:%s'), NULL) AS updated_at,
                        u.username
                    FROM 
                        Post as p
                    JOIN 
                        User as u
                    ON 
                        p.user_id = u.id 
                    WHERE 
                        p.id = :id`, {
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
                return Database_1.default.query('INSERT INTO Post (content, user_id, created_at) VALUE (:content, :userId, NOW())', {
                    content: content,
                    userId: userId
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
                return Database_1.default.query('UPDATE Post SET content = :content, updated_at = NOW() WHERE id = :id', {
                    id: id,
                    content: content
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
}
exports.default = new PostRepository();
