const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORTPSQL,
});

async function testConnection() {
    try {
        const client = await pool.connect();
        console.log('Connected to database');
        client.release();
    } catch (err) {
        console.error('Failed to connect to database:', err);
    }
}

testConnection();

module.exports = pool;
