const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all player or search by name
router.get('/', (req, res) => {
    const search = req.query.name || '';
    const sql = 'SELECT * FROM player WHERE name LIKE ?';
    db.query(sql, [`%${search}%`], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get a player by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM player WHERE player_id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.json(results[0] || {});
    });
});

// Add a new player
router.post('/', (req, res) => {
    const { name, age, nationality, position, goals, assists, minutes_played, injuries, club_id } = req.body;
    const sql = 'INSERT INTO player (name, age, nationality, position, goals, assists, minutes_played, injuries, club_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, age, nationality, position, goals, assists, minutes_played, injuries, club_id], (err, results) => {
        if (err) throw err;
        res.status(200).json({ id: results.insertId });
    });
});

// Update a player
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, nationality, position, goals, assists, minutes_played, injuries, club_id } = req.body;
    const sql = 'UPDATE player SET name = ?, age = ?, nationality = ?, position = ?, goals = ?, assists = ?, minutes_played = ?, injuries = ?, club_id = ? WHERE player_id = ?';
    db.query(sql, [name, age, nationality, position, goals, assists, minutes_played, injuries, club_id, id], (err) => {
        if (err){
            console.error(err);
            return res.status(500).json({ success: false, message: 'Failed to update player' });
        };
        res.status(200).json({ success: true, message: 'Player updated successfully' });
    });
});

// Delete a player
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM player WHERE player_id = ?';
    db.query(sql, [id], (err) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

module.exports = router;
