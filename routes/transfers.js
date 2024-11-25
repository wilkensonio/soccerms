const express = require('express');
const router = express.Router();
const db = require('../config/db');


// transfer a player
router.post('/', (req, res) => {
    const { player_id, club_id, from_club_id, to_club_id, transfer_fee, transfer_date } = req.body;

    if (!player_id || !club_id || !transfer_fee || !transfer_date) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const updatePlayerQuery = 'UPDATE player SET club_id = ? WHERE player_id = ?';
    const insertTransferQuery = 'INSERT INTO transfer (player_id, from_club_id, to_club_id, transfer_fee, transfer_date) VALUES (?, ?, ?, ?, ?)';

    db.beginTransaction(err => {
        if (err) {
            console.error('Transaction Error:', err);
            return res.status(500).json({ success: false, message: 'Transaction initialization failed.' });
        }

        db.query(updatePlayerQuery, [to_club_id, player_id], (err) => {
            if (err) {
                console.error('Update Player Error:', err);
                return db.rollback(() => {
                    res.status(500).json({ success: false, message: 'Failed to update player.' });
                });
            }

            db.query(insertTransferQuery, [player_id, from_club_id, to_club_id, transfer_fee, transfer_date], (err) => {
                if (err) {
                    console.error('Insert Transfer Error:', err);
                    return db.rollback(() => {
                        res.status(500).json({ success: false, message: 'Failed to insert transfer record.' });
                    });
                }

                db.commit(err => {
                    if (err) {
                        console.error('Commit Error:', err);
                        return db.rollback(() => {
                            res.status(500).json({ success: false, message: 'Transaction commit failed.' });
                        });
                    }
                    res.status(201).json({ success: true, message: 'Player transferred successfully' });
                });
            });
        });
    });
});


// transfer history
router.get('/history', (req, res) => {
    const sql = `
        SELECT 
            p.name AS player_name, 
            c1.name AS from_club, 
            c2.name AS to_club, 
            t.transfer_fee, 
            t.transfer_date
        FROM 
            transfer t
        JOIN 
            club c1 on t.from_club_id = c1.club_id
        JOIN 
            club c2 on t.to_club_id = c2.club_id
        JOIN 
            player p on t.player_id = p.player_id
        ORDER BY 
            t.transfer_date DESC
    `;
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Failed to fetch transfer history' });
        }

        return res.json({transfers:results});
    });
});

module.exports = router;