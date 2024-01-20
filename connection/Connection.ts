import mysql from 'mysql2/promise';

async function checkConnection() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: 'anonympost',
        });

        console.log('Successfully connected to the database.');
        await connection.end();
    } catch (error) {
        console.error('Failed to connect to the database.', error);
    }
}

checkConnection().then(
    () => console.log('Connection successful.'),
);