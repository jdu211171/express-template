import db from '../connection/Database';

class UsersRepository {

<<<<<<< HEAD
    async createUser(data: { username: string, devise_token: string }): Promise<any> {
        try {
            return await db.query('INSERT INTO User (username, devise_token) VALUE (:username, :devise_token)', {
                username: data.username,
                devise_token: data.devise_token
=======
    async createUser(username: string, device_token: string): Promise<any> {
        try {
            return await db.query('INSERT INTO User (username,device_token) VALUE (:username,:device_token)', {
                username: username,
                device_token: device_token
>>>>>>> c916f94fdf3aa670f29d3ca0e2208ace84db1a83
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
