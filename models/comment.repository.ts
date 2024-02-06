import db from '../connection/Database';

class CommentRepository {

    async createComment(post_id: number, comment: string, user_id: number): Promise<any> {
        return await db.query(`INSERT INTO Comment (sentence, post_id, user_id, created_at) 
        VALUE (:sentence, :post_id, :user_id, NOW())`, {
            sentence: comment,
            post_id: post_id,
            user_id: user_id
        });
    }

    async allComments(post_id: number, lastId: number, limit: number): Promise<any> {
        try {
            return db.query(`SELECT 
                    c.id,
                    u.id as user_id,
                    u.username,
                    c.sentence,
                    DATE_FORMAT(c.created_at, '%Y-%m-%d %H:%i:%s') as created_at,
                    IFNULL(DATE_FORMAT(c.updated_at, '%Y-%m-%d %H:%i:%s'), NULL) AS updated_at
                FROM Comment as c
                INNER JOIN Post as p
                    ON c.post_id = p.id 
                INNER JOIN User as u
                    ON c.user_id = u.id 
                WHERE p.id = :post_id
                ORDER BY c.id,c.created_at 
                LIMIT :limit 
                OFFSET :offset`, {
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
        return await db.query('UPDATE Comment SET sentence = :sentence, updated_at = NOW() WHERE id = :id', {
            sentence: comment,
            id: id
        });
    }

    async deleteComment(id: number): Promise<any> {
        return await db.query('DELETE FROM Comment WHERE id = :id', {
            id: id
        });
    }

    async findComment(id: number): Promise<any> {
        try {
            return db.query(`SELECT 
                    c.id,
                    u.id as user_id,
                    u.username,
                    c.sentence,
                    DATE_FORMAT(c.created_at, '%Y-%m-%d %H:%i:%s') as created_at,
                    IFNULL(DATE_FORMAT(c.updated_at, '%Y-%m-%d %H:%i:%s'), NULL) AS updated_at
                FROM Comment as c
                INNER JOIN Post as p
                    ON c.post_id = p.id 
                INNER JOIN User as u
                    ON c.user_id = u.id 
                WHERE c.id = :comment_id`, {
                comment_id: id
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default new CommentRepository();
