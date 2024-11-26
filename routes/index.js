const express = require('express');
const router = express.Router();

const playersRoutes = require('./players');
const clubsRoutes = require('./clubs');
const transfers = require('./transfers');  
const fans = require('./fans');
 
router.use('/players', playersRoutes);
router.use('/clubs', clubsRoutes);
router.use('/transfers', transfers);
router.use('/fans', fans);

module.exports = router;
