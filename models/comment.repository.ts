import { PrismaClient, Comment, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

class CommentRepository {
    async createComment(comment: Partial<Comment>): Promise<Comment> {
        try {
            return await prisma.comment.create({
                data: comment,
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getAllComment(id: number): Promise<Comment[] | null> {
        try {
            return await prisma.comment.findMany({
                where: {
                    post_id: id
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getCommentById(id: number): Promise<Comment | null> {
        try {
            return await prisma.comment.findUnique({
                where: { id },
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateComment(id: number, comment: Prisma.CommentUpdateInput): Promise<Comment> {
        try {
            return await prisma.comment.update({
                where: { id },
                data: comment,
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteComment(id: number): Promise<Comment> {
        try {
            return await prisma.comment.delete({
                where: { id },
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default new CommentRepository();