const express = require('express');
const router = express.Router();
const db = require('../config/db');



// join the coach table with the club table
router.get('/', (req, res) => {
    const sql = `
        SELECT 
        club.club_id,
        club.name,
        club.country,
        club.stadium_name
        
          
        FROM club
        JOIN coach using (club_id)`; 

    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


module.exports = router;    