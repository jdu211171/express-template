import db from '../connection/Database';

class CommentRepository {

    async createComment(post_id: number, comment: string, user_id: number): Promise<any> {
        return await db.query('INSERT INTO Comment (sentence, post_id, user_id) VALUES (:sentence, :post_id, :user_id)', {
            sentence: comment,
            post_id: post_id,
            user_id: user_id
        });
    }

    async allComments(post_id: number, lastId: number, limit: number): Promise<any> {
        try {
            return db.query(
                'SELECT User.username, Comment.sentence FROM Comment INNER JOIN Post ON Comment.post_id = Post.id INNER JOIN User ON Comment.user_id = User.id WHERE Post.id = :post_id ORDER BY Comment.created_at LIMIT :limit OFFSET :offset', {
                    limit: limit.toString(),
                    offset: ((lastId - 1) * limit).toString(),
                    post_id: post_id
                }
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateComment(id: number, comment: any): Promise<any> {
        return await db.query('UPDATE Comment SET sentence = :sentence WHERE id = :id', {
            sentence: comment,
            id: id
        });
    }

    async deleteComment(id: number): Promise<any> {
        return await db.query('DELETE FROM Comment WHERE id = :id', {
            id: id
        });
    }

}

export default new CommentRepository();