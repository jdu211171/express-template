import db from '../connection/Database';

class PostRepository {

    async allPosts(lastId: number, limit: number): Promise<any> {
        try {
            return db.query(`SELECT
                p.id,p.content,DATE_FORMAT(p.created_at, '%Y-%m-%d %H:%i:%s') as created_at,
                IFNULL(DATE_FORMAT(p.updated_at, '%Y-%m-%d %H:%i:%s'), NULL) AS updated_at,
                u.id AS user_id,u.username,
                count(DISTINCT c.id) AS comment_count, count(DISTINCT r.id) AS reaction_count
            FROM 
                Post as p
            INNER JOIN 
                User AS u ON u.id = p.user_id
            LEFT JOIN 
                Comment as c ON c.post_id = p.id
            LEFT JOIN 
                Reaction as r ON r.post_id = p.id AND r.reaction_type = 1
            GROUP 
                BY p.id
            ORDER 
                BY p.id DESC,p.created_at DESC
            LIMIT 
                :limit OFFSET :offset;`, {
                    limit: limit.toString(),
                    offset: ((lastId - 1) * limit).toString()
                }
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async search(lastId: number, limit: number, keyword: string): Promise<any> {
        try {
            return db.query(`SELECT
                p.id,p.content,DATE_FORMAT(p.created_at, '%Y-%m-%d %H:%i:%s') as created_at,
                IFNULL(DATE_FORMAT(p.updated_at, '%Y-%m-%d %H:%i:%s'), NULL) AS updated_at,
                u.id AS user_id,u.username,
                count(DISTINCT c.id) AS comment_count, count(DISTINCT r.id) AS reaction_count
            FROM 
                Post as p
            INNER JOIN 
                User AS u ON u.id = p.user_id
            LEFT JOIN 
                Comment as c ON c.post_id = p.id
            LEFT JOIN 
                Reaction as r ON r.post_id = p.id AND r.reaction_type = 1
            WHERE 
                p.content LIKE :keyword
            GROUP 
                BY p.id
            ORDER 
                BY p.id DESC,p.created_at DESC
            LIMIT 
                :limit OFFSET :offset;`, {
                    limit: limit.toString(),
                    offset: ((lastId - 1) * limit).toString(),
                    keyword: `%${keyword}%`
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
            return db.query(`SELECT 
                        p.id,p.content,p.user_id,
                        DATE_FORMAT(p.created_at, '%Y-%m-%d %H:%i:%s') as created_at,
                        IFNULL(DATE_FORMAT(p.updated_at, '%Y-%m-%d %H:%i:%s'), NULL) AS updated_at,
                        u.username
                    FROM 
                        Post as p
                    JOIN 
                        User as u
                    ON 
                        p.user_id = u.id 
                    WHERE 
                        p.id = :id`, {
                id: id
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async createPost(userId: number, content: string): Promise<any> {
        try {
            return db.query('INSERT INTO Post (content, user_id, created_at) VALUE (:content, :userId, NOW())', {
                content: content,
                userId: userId
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updatePost(id: number, content: string): Promise<any> {
        try {
            return db.query('UPDATE Post SET content = :content, updated_at = NOW() WHERE id = :id', {
                id: id,
                content: content
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

    // async getReactions(postId: number) {
    //     try {
    //         return db.query('SELECT reaction_type FROM Reaction WHERE post_id = :post_id', {
    //             post_id: postId
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         throw error;
    //     }
    // }
    //
    // async addReaction(userId: number, postId: number, reactionType: number) {
    //     try {
    //         return db.query('INSERT INTO Reaction (reaction_type, user_id, post_id) VALUE (:reaction_type, :user_id, :post_id)', {
    //             reaction_type: reactionType,
    //             user_id: userId,
    //             post_id: postId
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         throw error;
    //     }
    // }

}

export default new PostRepository();
