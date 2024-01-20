import db from '../connection/Database';

class CommentRepository {
    async createComment(comment: any): Promise<any> {
        const { content, postId } = comment;
        return await db.query('INSERT INTO Comment (content, post_id) VALUES (?, ?)', [content, postId]);
    }

    // ... rest of your methods
}

export default new CommentRepository();
