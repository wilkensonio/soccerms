const express = require('express');
const router = express.Router();

const playersRoutes = require('./players');
const clubsRoutes = require('./clubs');
const transfers = require('./transfers');  
 
router.use('/players', playersRoutes);
router.use('/clubs', clubsRoutes);
router.use('/transfers', transfers);

module.exports = router;
