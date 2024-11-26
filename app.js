const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();

// Function to check database connection
async function checkDbConnection() {
    const dbHost = process.env.DB_HOST || 'localhost';
    const dbUser = process.env.DB_USER || 'root';
    const dbPassword = process.env.DB_PASSWORD || '';
    const dbName = process.env.DB_NAME || 'test';

    try {
        const connection = await mysql.createConnection({
            host: dbHost,
            user: dbUser,
            password: dbPassword,
            database: dbName,
        });
        await connection.end();
        return true;
    } catch (err) {
        console.error('Failed to connect to database:', err.message);
        return false;
    }
}

// Route: /
app.get('/', async (req, res) => {
    res.send("Hello, I'm an Express app");
});

// Route: /check-db
app.get('/check-db', async (req, res) => {
    const isConnected = await checkDbConnection();
    if (isConnected) {
        res.send('Database Connection Status: Connected');
    } else {
        res.send('Database Connection Status: Disconnected');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

