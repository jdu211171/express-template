import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

class PostRepository {

    async allPosts() {
        try {
            return prisma.post.findMany({
                include: {user: true},
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async findPost(id: number) {
        try {
            return prisma.post.findUnique({
                where: {id: id},
                include: {user: true},
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async createPost(userId: number, content: string) {
        try {
            return prisma.post.create({
                data: {
                    content: content,
                    user: {
                        connect: {id: userId},
                    },
                },
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updatePost(id: number, content: string) {
        try {
            return prisma.post.update({
                where: {id: id},
                data: {content: content},
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deletePost(id: number) {
        try {
            return prisma.post.delete({where: {id: id}});
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getReactions(postId: number) {
        try {
            return prisma.reaction.findMany({
                where: {post: {id: postId}},
                select: {reaction_type: true},
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async addReaction(userId: number, postId: number, reactionType: number) {
        try {
            return prisma.reaction.create({
                data: {
                    reaction_type: reactionType,
                    user: {
                        connect: {id: userId},
                    },
                    post: {
                        connect: {id: postId},
                    },
                },
            });
        }  catch (error) {
            console.error(error);
            throw error;
        }
    }

}