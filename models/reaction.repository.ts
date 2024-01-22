import db from '../connection/Database';

class ReactionRepository {
    async createReaction(reaction: { reaction_type: number, post_id: number }, user_id: number): Promise<any> {
        try {
            return await db.query('INSERT INTO Reaction (reaction_type, user_id, post_id) VALUES (?, ?, ?)', [reaction.reaction_type, user_id, reaction.post_id]);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getReactionById(id: number): Promise<any> {
        try {
            return await db.query('SELECT * FROM Reaction WHERE id = ?', [id]);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateReaction(id: number, reaction: { reaction_type: number, post_id: number }): Promise<any> {
        try {
            return await db.query('UPDATE Reaction SET reaction_type = ?, post_id = ? WHERE id = ?', [reaction.reaction_type, reaction.post_id, id]);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteReaction(id: number): Promise<any> {
        try {
            return await db.query('DELETE FROM Reaction WHERE id = ?', [id]);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

export default new ReactionRepository();
