const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: '', 
    password: '' 
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');

    db.query('CREATE DATABASE IF NOT EXISTS playerdb;', (err) => {
        if (err) throw err;
        console.log('Database created or already exists.');

        db.changeUser({ database: 'playerdb' }, (err) => {
            if (err) throw err;

            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS players (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    age INT,
                    nation VARCHAR(100),
                    position VARCHAR(100),
                    goals INT,
                    assists INT,
                    minutes INT,
                    injuries INT,
                    fans INT,
                    transfer_date DATE,
                    from_club VARCHAR(100),
                    to_club VARCHAR(100),
                    transfer_fee VARCHAR(100)
                );
            `;

            db.query(createTableQuery, (err) => {
                if (err) throw err;
                console.log('Table created or already exists.');

                const insertPlayers = `
                    INSERT INTO players (name, age, nation, position, goals, assists, minutes, injuries, fans, transfer_date, from_club, to_club, transfer_fee) VALUES 
                    ('Lionel Messi', 34, 'Argentina', 'Forward', 750, 300, 80000, 5, 100000000, '2023-07-15', 'PSG', 'Inter Miami', 'Free'),
                    ('Cristiano Ronaldo', 36, 'Portugal', 'Forward', 800, 250, 90000, 3, 150000000, '2023-08-10', 'Manchester United', 'Al Nassr', 'Free'),
                    ('Neymar', 29, 'Brazil', 'Forward', 400, 200, 75000, 2, 90000000, '2023-07-20', 'PSG', 'Al Hilal', 'Free'),
                    ('Kylian Mbappé', 22, 'France', 'Forward', 200, 100, 50000, 1, 50000000, '2023-06-30', 'PSG', 'Real Madrid', 'Free')
                    ON DUPLICATE KEY UPDATE id=id;  /* Prevents duplicate entries */
                `;

                db.query(insertPlayers, (err) => {
                    if (err) throw err;
                    console.log('Initial players inserted.');
                    db.end();
                });
            });
        });
    });
});