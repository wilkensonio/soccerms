const express = require('express');
const router = express.Router();

const playersRoutes = require('./players');
const clubsRoutes = require('./clubs');
const transfers = require('./transfers');  
const fans = require('./fans');
const matchesRoutes = require('./matches');
const competitionRoutes = require('./competitions');
 
router.use('/players', playersRoutes);
router.use('/clubs', clubsRoutes);
router.use('/transfers', transfers);
router.use('/fans', fans);
router.use('/matches', matchesRoutes);
router.use('/competitions', competitionRoutes);


module.exports = router;
