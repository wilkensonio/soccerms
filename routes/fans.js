const express = require('express');
const router = express.Router();
const db = require('../config/db');


router.get('/', (req, res) => {  
    const sql = 'SELECT * FROM fan';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


// join the fan table with the club table and the player table
router.get('/fanclubplayer', (req, res) => {
    const sql = `
        SELECT 
            f.fan_id AS fan_id,
            p.name AS player_name,
            c.name AS club_name,
            c.club_id AS club_id, 
            p.player_id AS player_id
        FROM fan f 
        JOIN club c using (club_id)
        JOIN player p using (player_id)`; 

    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

module.exports = router;    