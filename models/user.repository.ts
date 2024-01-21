import db from '../connection/Database';

class UsersRepository {

    async createUser(data: {username: string}): Promise<any> {
        try {
            return await db.query('INSERT INTO User (username) VALUES (?)', [data.username]);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getUserById(id: number): Promise<any> {
        try {
            return await db.query('SELECT * FROM User WHERE id = ?', [id]);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateUser(id: number, data: {username: string}): Promise<any> {
        try {
            return await db.query('UPDATE User SET username = ? WHERE id = ?', [data.username, id]);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

export default new UsersRepository();
