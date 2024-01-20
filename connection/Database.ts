import mysql from 'mysql2/promise';

class Database {
    private database!: mysql.Connection;

    constructor() {
        this.connect();
    }

    private async connect() {
        this.database = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            port: Number(process.env.DB_PORT),
            database: 'anonympost',
        });
    }

    public async query(query: string, values?: any) {
        const [rows] = await this.database.execute(query, values);
        return rows;
    }
}

export default new Database();