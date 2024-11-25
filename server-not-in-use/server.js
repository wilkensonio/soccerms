const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'nodemon',
    password: 'Cookies1%',
    database: 'playerdb'
});

// Connect to MySQL
db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});


app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API to fetch players
app.get('/api/players', (req, res) => {
    const search = req.query.name || '';
    const sql = 'SELECT * FROM player WHERE name LIKE ?';
    db.query(sql, [`%${search}%`], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});