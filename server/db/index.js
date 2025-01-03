const { Client } = require('pg');
require('dotenv').config(); // Ensure this is at the top

const client = new Client({
    user: process.env.DB_USER, // Use environment variables
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

client.connect()
.then(() => console.log("Connected to database"))
.catch((err) => console.error("Connection error", err.stack));

module.exports = client;
