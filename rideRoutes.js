
const express = require('express');
const router = express.Router();
const { postRide, joinRide, getUserJourneys } = require('../controllers/rideController');
const Ride = require('../models/Ride');

// ✅ GET all rides → /api/rides
router.get('/rides', async (req, res) => {
  try {
    const rides = await Ride.find();
    res.status(200).json(rides);
  } catch (err) {
    console.error('❌ Failed to fetch rides:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ POST a new ride → /api/rides
router.post('/rides', postRide);

// ✅ PATCH to join a ride → /api/rides/:id/join
router.patch('/rides/:id/join', joinRide);

// ✅ GET journeys → /api/journeys/:email
router.get('/journeys/:email', getUserJourneys);

module.exports = router;
