import db from '../connection/Database';

class PostRepository {

    async allPosts(lastId: number, limit: number): Promise<any> {
        try {
            return db.query(
                'SELECT u.*, p.*, COUNT(c.id) as comment_count, r.reaction_type, COUNT(r.reaction_type) as reaction_count FROM Post as p JOIN User as u ON p.user_id = u.id LEFT JOIN Reaction as r ON p.id = r.post_id LEFT JOIN Comment as c ON p.id = c.post_id GROUP BY p.id, r.reaction_type ORDER BY reaction_type LIMIT :limit OFFSET :offset;', {
                    limit: limit.toString(),
                    offset: ((lastId - 1) * limit).toString()
                }
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
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

    async findPost(id: number): Promise<any> {
        try {
            return db.query('SELECT * FROM Post JOIN User ON Post.user_id = User.id WHERE Post.id = :id', {
                id: id
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async createPost(userId: number, content: string): Promise<any> {
        try {
            return db.query('INSERT INTO Post (content, user_id, created_at) VALUE (:content, :userId, :createdAt)',{
                content: content,
                userId: userId,
                createdAt: new Date()
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updatePost(id: number, content: string): Promise<any> {
        try {
            return db.query('UPDATE Post SET content = :content, updated_at = :updated_at WHERE id = :id', {
                id: id,
                content: content,
                updated_at: new Date()
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deletePost(id: number): Promise<any> {
        try {
            return db.query('DELETE FROM Post WHERE id = :id', {
                id: id
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getReactions(postId: number) {
        try {
            return db.query('SELECT reaction_type FROM Reaction WHERE post_id = :post_id', {
                post_id: postId
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async addReaction(userId: number, postId: number, reactionType: number) {
        try {
            return db.query('INSERT INTO Reaction (reaction_type, user_id, post_id) VALUE (:reaction_type, :user_id, :post_id)', {
                reaction_type: reactionType,
                user_id: userId,
                post_id: postId
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

export default new PostRepository();
