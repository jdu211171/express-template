import db from '../connection/Database';

class UsersRepository {
    async allUsers():Promise<any>{
        try {
            return await db.query("SELECT device_token FROM User WHERE device_token IS NOT NULL");
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async createUser(username: string, device_token: string): Promise<any> {
        try {
            return await db.query('INSERT INTO User (username, device_token) VALUE (:username,:device_token)', {
                username: username,
                device_token: device_token
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getUserById(id: number): Promise<any> {
        try {
            return await db.query('SELECT * FROM User WHERE id = :id', {
                id: id
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateUser(id: number, username: string): Promise<any> {
        try {
            return await db.query('UPDATE User SET username = :username WHERE id = :id', {
                id: id,
                username: username
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

export default new UsersRepository();
