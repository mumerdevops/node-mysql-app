const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

let db;

function handleDisconnect() {
    console.log('🔄 Attempting to connect to MySQL...');
    
    db = mysql.createConnection({
        // CHANGED: Use host.docker.internal to talk to the DB container
        host: 'host.docker.internal', 
        user: 'root',
        password: '12345',
        database: 'test_db'
    });

    db.connect((err) => {
        if (err) {
            console.error('❌ Connection failed! Reason: ' + err.message);
            console.log('⏳ Retrying in 5 seconds...');
            setTimeout(handleDisconnect, 5000); 
            return;
        }
        
        console.log('✅ Connected to MySQL successfully!');

        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100),
                email VARCHAR(100)
            );`;
        
        db.query(createTableQuery, (err) => {
            if (err) console.error("Table error:", err);
            else console.log("✅ Database Table Ready");
        });
    });

    db.on('error', (err) => {
        console.log('⚠️ DB Error:', err.code);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNREFUSED') {
            handleDisconnect();
        } 
        // Removed the 'throw err' so the app NEVER crashes
    });
}

handleDisconnect();

// --- API Routes ---
app.get('/users', (req, res) => {
    if (!db) return res.status(503).send("Database not ready");
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(sql, [name, email], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId, name, email });
    });
});

app.get('/delete/:id', (req, res) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.redirect('/');
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Server LIVE at http://localhost:${port}`);
});