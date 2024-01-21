import db from '../connection/Database';

class CommentRepository {

    async createComment(comment: any): Promise<any> {
        const { content, postId } = comment;
        return await db.query('INSERT INTO Comment (sentence, post_id) VALUES (?, ?)', [content, postId]);
    }

    async getCommentById(id: number): Promise<any> {
        return await db.query('SELECT * FROM Comment WHERE id = ?', [id]);
    }

    async getAllComments(id: number): Promise<any> {
        return await db.query('SELECT * FROM Comment WHERE post_id = ?', [id]);
    }

    async updateComment(id: number, comment: any): Promise<any> {
        const { content } = comment;
        return await db.query('UPDATE Comment SET sentence = ? WHERE id = ?', [content, id]);
    }

    async deleteComment(id: number): Promise<any> {
        return await db.query('DELETE FROM Comment WHERE id = ?', [id]);
    }

}

export default new CommentRepository();
