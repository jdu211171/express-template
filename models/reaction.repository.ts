import db from '../connection/Database';

class ReactionRepository {
    async createReaction(user_id: number, reaction: { reaction_type: number, post_id: number }): Promise<any> {
        try {
            return await db.query('INSERT INTO Reaction (reaction_type, post_id, user_id) VALUE (:reaction_type, :post_id, :user_id)', {
                reaction_type: reaction.reaction_type,
                post_id: reaction.post_id,
                user_id: user_id
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getReactionById(user_id: any): Promise<any> {
        try {
            return await db.query('SELECT post_id, reaction_type FROM Reaction WHERE user_id = :user_id', {
                user_id: user_id
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateReaction(user_id: number, reaction: { reaction_type: number, post_id: number }): Promise<any> {
        try {
            return await db.query('UPDATE Reaction SET reaction_type = :reaction_type WHERE user_id = :user_id AND post_id = :post_id', {
                user_id: user_id,
                reaction_type: reaction.reaction_type,
                post_id: reaction.post_id
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