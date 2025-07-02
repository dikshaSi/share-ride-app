const express = require('express');
const router = express.Router();
const cancelController = require('../controllers/CancelController');

// PATCH /api/cancelride
// Cancels a joined or posted ride based on ride type
router.patch('/cancelride', cancelController.cancelRide);

module.exports = router;
