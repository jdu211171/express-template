import db from '../connection/Database';

class ReactionRepository {
    async createReaction(user_id: number, post_id: number, reaction_type: number): Promise<any> {
        try {
            return await db.query(`INSERT INTO Reaction (reaction_type, post_id, user_id) 
            VALUE (:reaction_type, :post_id, :user_id)`, {
                reaction_type: reaction_type,
                post_id: post_id,
                user_id: user_id
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getAllReactionsByPostId(id: number): Promise<any> {
        try {
            return await db.query('SELECT reaction_type, COUNT(reaction_type) AS count FROM Reaction WHERE post_id = :post_id GROUP BY reaction_type', {
                post_id: id
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getReactionById(user_id: number, post_id: number): Promise<any> {
        try {
            return await db.query('SELECT * FROM Reaction WHERE post_id = :post_id AND user_id = :user_id;', {
                user_id: user_id,
                post_id: post_id
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateReaction(user_id: number, post_id: number,reaction_type: number): Promise<any> {
        try {
            return await db.query('UPDATE Reaction SET reaction_type = :reaction_type WHERE user_id = :user_id AND post_id = :post_id', {
                user_id: user_id,
                reaction_type: reaction_type,
                post_id: post_id
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteReaction(post_id: number): Promise<any> {
        try {
            return await db.query('DELETE FROM Reaction WHERE post_id = :post_id', {
                post_id: post_id
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

export default new ReactionRepository();
