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
class ReactionRepository {
    createReaction(user_id, post_id, reaction_type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Database_1.default.query(`INSERT INTO Reaction (reaction_type, post_id, user_id) 
            VALUE (:reaction_type, :post_id, :user_id)`, {
                    reaction_type: reaction_type,
                    post_id: post_id,
                    user_id: user_id
                });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    getAllReactionsByPostId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Database_1.default.query('SELECT reaction_type, COUNT(reaction_type) AS count FROM Reaction WHERE post_id = :post_id GROUP BY reaction_type', {
                    post_id: id
                });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    getReactionById(user_id, post_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Database_1.default.query('SELECT * FROM Reaction WHERE post_id = :post_id AND user_id = :user_id;', {
                    user_id: user_id,
                    post_id: post_id
                });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    updateReaction(user_id, post_id, reaction_type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Database_1.default.query('UPDATE Reaction SET reaction_type = :reaction_type WHERE user_id = :user_id AND post_id = :post_id', {
                    user_id: user_id,
                    reaction_type: reaction_type,
                    post_id: post_id
                });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    deleteReaction(post_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Database_1.default.query('DELETE FROM Reaction WHERE post_id = :post_id', {
                    post_id: post_id
                });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
}
exports.default = new ReactionRepository();
