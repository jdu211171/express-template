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
class ReactionRepository {
    createReaction(reaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.reaction.create({
                    data: reaction,
                });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    getReactionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.reaction.findUnique({
                    where: { id },
                });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    updateReaction(id, reaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.reaction.update({
                    where: { id },
                    data: reaction,
                });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    deleteReaction(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.reaction.delete({
                    where: { id },
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
