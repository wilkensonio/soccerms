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