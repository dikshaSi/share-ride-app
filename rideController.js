

const Ride = require('../models/Ride');

// POST /api/rides
const postRide = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      console.log("❌ Empty or missing req.body");
      return res.status(400).json({ message: "Request body is missing or invalid" });
    }

    const { from, to, fare, time, seatsAvailable, email, date, contact, personJoined } = req.body;

    if (!from || !to || !fare || !time || !seatsAvailable || !email || !date || !contact) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Optional: check for existing ride match (can remove if not needed)
    const existingRide = await Ride.findOne({ from, to });
    if (existingRide) {
      if (existingRide.seatsAvailable <= 0) {
        return res.status(400).json({ message: 'No seats available for this route.' });
      }

      if (!existingRide.date && date) existingRide.date = date;
      if (!existingRide.contact && contact) existingRide.contact = contact;

      existingRide.personJoined += 1;
      existingRide.seatsAvailable -= 1;

      const updatedRide = await existingRide.save();
      return res.status(200).json(updatedRide);
    }

    // Create new ride
    const newRide = new Ride({
      from,
      to,
      fare,
      time,
      seatsAvailable,
      personJoined,
      email,
      date,
      contact,
      joinedUsers: [] // ✅ Initialize empty joinedUsers list
    });

    const savedRide = await newRide.save();
    res.status(201).json(savedRide);
  } catch (err) {
    console.error('Ride post failed:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PATCH /api/rides/:id/join
const joinRide = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const ride = await Ride.findById(id);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });

    if (!ride.contact || !ride.date) {
      return res.status(400).json({ message: 'This ride is missing required contact or date info.' });
    }

    if (ride.seatsAvailable <= 0) {
      return res.status(400).json({ message: 'No seats available' });
    }

    if (ride.joinedUsers.includes(email)) {
      return res.status(400).json({ message: 'You have already joined this ride.' });
    }

    ride.personJoined += 1;
    ride.seatsAvailable -= 1;
    ride.joinedUsers.push(email); // ✅ Track user who joined

    const updatedRide = await ride.save();
    res.status(200).json(updatedRide);
  } catch (err) {
    console.error('Join Ride Failed:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/journeys/:email
const getUserJourneys = async (req, res) => {
  try {
    const { email } = req.params;

    const posted = await Ride.find({ email }); // Rides the user posted
    const joined = await Ride.find({ joinedUsers: email }); // Rides the user joined

    res.status(200).json({ posted, joined });
  } catch (err) {
    console.error("❌ Journey fetch failed:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { postRide, joinRide, getUserJourneys };
