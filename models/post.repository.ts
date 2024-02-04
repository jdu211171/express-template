import db from '../connection/Database';

class PostRepository {

    async allPosts(lastId: number, limit: number): Promise<any> {
        try {
            return db.query('SELECT \n' +
                '\tp.id,p.content,p.created_at,p.updated_at,\n' +
                '    u.id AS user_id,u.username,\n' +
                '    count(c.id) AS comment_count, count(r.id) AS reaction_count\n' +
                'FROM Post as p\n' +
                'INNER JOIN User AS u ON u.id = p.user_id\n' +
                'LEFT JOIN Comment as c ON c.post_id = p.id\n' +
                'LEFT JOIN Reaction as r ON r.post_id = p.id AND r.reaction_type = 1\n' +
                'GROUP BY p.id\n' +
                'ORDER BY p.created_at DESC\n' +
                'LIMIT :limit OFFSET :offset;', {
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
            return db.query('INSERT INTO Post (content, user_id, created_at) VALUE (:content, :userId, :createdAt)', {
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
