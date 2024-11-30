const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: 'playerdb'
});

// I found it weird but I found out that this only works for root users and not admin users
// I had to create a new user with root privileges to make this work.

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

module.exports = db;
