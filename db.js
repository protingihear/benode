const mysql = require('mysql2/promise');

// Atur process.env secara manual
process.env.DB_HOST = 'localhost';
process.env.DB_USER = 'root';
process.env.DB_PASSWORD = '';
process.env.DB_NAME = 'ihear_db';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, 
    password: '', 
    database: process.env.DB_NAME, 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('konek jing');
        connection.release(); 
    } catch (error) {
        console.error('p gagal', error);
    }
})();

module.exports = pool;
