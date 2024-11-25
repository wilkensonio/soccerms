const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all clubs
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM club';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get a club by ID
router.get('/:club_id', (req, res) => {
    const { club_id } = req.params;
    const sql = 'SELECT * FROM club WHERE club_id = ?';
    db.query(sql, [club_id], (err, results) => {
        if (err) throw err;
        res.json(results[0] || {});
    });
});

// Add a new club
router.post('/', (req, res) => {
    const { name, foundation_year, country, stadium_name, capacity } = req.body;
    const sql = 'INSERT INTO club (name, foundation_year, country, stadium_name, capacity) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, foundation_year, country, stadium_name, capacity], (err, results) => {
        if (err) throw err;
        res.status(201).json({ club_id: results.insertId });
    });
});

// Update a club
router.put('/:club_id', (req, res) => {
    const { club_id } = req.params;
    const { name, foundation_year, country, stadium_name, capacity } = req.body;
    const sql = 'UPDATE club SET name = ?, foundation_year = ?, country = ?, stadium_name = ?, capacity = ? WHERE club_id = ?';
    db.query(sql, [name, foundation_year, country, stadium_name, capacity, club_id], (err) => {
        if (err) throw err;
        res.sendStatus(204);
    });
});

// Delete a club
router.delete('/:club_id', (req, res) => {
    const { club_id } = req.params;
    const sql = 'DELETE FROM club WHERE club_id = ?';
    db.query(sql, [club_id], (err) => {
        if (err) throw err;
        res.sendStatus(204);
    });
});

module.exports = router;
