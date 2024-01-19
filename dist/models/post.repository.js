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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class PostRepository {
    allPosts(currentLoad, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return prisma.post.findMany({
                    skip: (currentLoad - 1) * limit,
                    take: limit,
                    include: { User: true },
                    orderBy: { created_at: 'desc' },
                });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    findPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return prisma.post.findUnique({
                    where: { id: id },
                    include: { User: true },
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
                return prisma.post.create({
                    data: {
                        content: content,
                        user_id: userId,
                        created_at: new Date(),
                    },
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
                return prisma.post.update({
                    where: { id: id },
                    data: {
                        content: content,
                        updated_at: new Date(),
                    },
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
                return prisma.post.delete({ where: { id: id } });
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
                return prisma.reaction.findMany({
                    where: { post_id: postId },
                    select: { reaction_type: true },
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
                return prisma.reaction.create({
                    data: {
                        reaction_type: reactionType,
                        user_id: userId,
                        post_id: postId,
                    },
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
