import { PrismaClient, Reaction } from '@prisma/client';

const prisma = new PrismaClient();

class ReactionRepository {
    async createReaction(reaction: Partial<Reaction>): Promise<Reaction> {
        try {
            return await prisma.reaction.create({
                data: reaction,
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getReactionById(id: number): Promise<Reaction | null> {
        try {
            return await prisma.reaction.findUnique({
                where: { id },
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateReaction(id: number, reaction: Partial<Reaction>): Promise<Reaction> {
        try {
            return await prisma.reaction.update({
                where: { id },
                data: reaction,
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteReaction(id: number): Promise<Reaction> {
        try {
            return await prisma.reaction.delete({
                where: { id },
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

export default new ReactionRepository();