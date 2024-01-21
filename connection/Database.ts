import mysql from 'mysql2/promise';

class Database {
    private database!: mysql.Connection;

    constructor() {
        this.connect().then(() => console.log('Connection successful.'));
    }

    async connect() {
        try {
            this.database = mysql.createPool({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                port: Number(process.env.DB_PORT),
                database: 'anonympost',
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0,
            });
            console.log('Successfully created a connection pool.');
        } catch (error) {
            console.error('Failed to connect to the database.', error);
        }

    }

    async disconnect() {
        if (this.database) {
            await this.database.end();
            console.log('Successfully disconnected from the database.');
        }
    }

    async query(sql: string, values?: any): Promise<any> {
        try {
            const [result] = await this.database.execute(sql, values);
            return result;
        } catch (error) {
            console.error('Failed to execute query.', error);
            throw error;
        }
    }

}

export default new Database();
