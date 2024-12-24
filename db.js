const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'iheara', 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to the database');
        connection.release(); 
    } catch (error) {
        console.error('Database connection error:', error);
    }
})();

module.exports = pool;
