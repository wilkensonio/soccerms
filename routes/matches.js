const express = require('express');
const router = express.Router();
const db = require('../config/db');

//  This query will get all matches or search by location attribute
router.get('/', (req, res) => {
    const search = req.query.location || '';
    const sql = 'SELECT * FROM `match` WHERE location LIKE ?';
    db.query(sql, [`%${search}%`], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


module.exports = router;

// Fetch match details along with club names
router.get('/details', (req, res) => {
    const search = req.query.location || '';
    const sql = `
        SELECT m.*, home.name AS home_team, away.name AS away_team, c.name AS competition_name 
        FROM \`match\` m 
        JOIN club home ON m.home_team = home.club_id 
        JOIN club away ON m.away_team = away.club_id 
        JOIN competition c ON m.competition_id = c.competition_id
        WHERE m.location LIKE ?
    `;
    db.query(sql, [`%${search}%`], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


// Explanation:
// The const query JOINS four tables 
// jOIN ALL CULUMNS FROM match table,  club table home and away column , and competiiton
//  This query looks for matches that have a location attribute that matches the search query.




