import db from '../connection/Database';

class PostRepository {

    async allPosts(currentLoad: number, limit: number): Promise<any> {
        try {
            return db.query('SELECT * FROM Post ORDER BY created_at DESC LIMIT ? OFFSET ?', [limit, (currentLoad - 1) * limit]);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async findPost(id: number): Promise<any> {
        try {
            return db.query('SELECT * FROM Post INNER JOIN User ON Post.user_id = User.id.userId = User.id WHERE Post.id = ?', [id]);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async createPost(userId: number, content: string): Promise<any> {
        try {
            return prisma.post.create({
                data: {
                    content: content,
                    user_id: userId,
                    created_at: new Date(),
                },
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updatePost(id: number, content: string): Promise<any> {
        try {
            return prisma.post.update({
                where: {id: id},
                data: {
                    content: content,
                    updated_at: new Date(),
                },
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deletePost(id: number): Promise<any> {
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
                where: {post_id: postId},
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
                    user_id: userId,
                    post_id: postId,
                },
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

export default new PostRepository();
