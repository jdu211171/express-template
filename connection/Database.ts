import mysql from 'mysql2/promise';

class Database {
    private database!: mysql.Connection;

    constructor() {
        this.connect().then(() => console.log('Connection successful.'));
    }

    async connect() {
        try {
            this.database = mysql.createPool({
                database: 'anonympost',
                host: 'anonympost.cbvagi0jkst8.ap-northeast-1.rds.amazonaws.com',
                user: 'admin',
                password: 'pCfXMtW2K6ssShilCYt2',
                port: 3306,
                namedPlaceholders: true
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
            // console.log(result)
            return result;
        } catch (error) {
            console.error('Failed to execute query.', error);
            // console.log(this.database.format(sql, values))
            throw error;
        }
    }

}

export default new Database();
