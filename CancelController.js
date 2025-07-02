const Ride = require('../models/Ride'); // Ride model

exports.cancelRide = async (req, res) => {
  const { rideId, userEmail, type } = req.body;

  console.log('🪵 [CANCEL REQUEST]');
  console.log('• rideId:', rideId);
  console.log('• userEmail:', userEmail);
  console.log('• type:', type);

  if (!rideId || !userEmail || !type) {
    return res.status(400).json({ error: 'rideId, userEmail, and type are required' });
  }

  try {
    if (type === 'posted') {
      // 🚮 Delete the ride entirely if the user posted it
      const deletedRide = await Ride.findOneAndDelete({ _id: rideId, email: userEmail });

      if (!deletedRide) {
        console.log('❌ Ride not found or unauthorized to delete');
        return res.status(404).json({ error: 'Ride not found or permission denied' });
      }

      console.log('✅ Ride permanently deleted by poster');
      return res.status(200).json({ message: 'Posted ride deleted successfully' });

    } else if (type === 'joined') {
      // 🛠 Update the ride if the user joined it
      const updatedRide = await Ride.findByIdAndUpdate(
        rideId,
        {
          $inc: { seatsAvailable: 1 },
          $pull: { joinedUsers: userEmail } // optional: remove their email from the list
        },
        { new: true }
      );

      if (!updatedRide) {
        console.log('❌ Ride not found when trying to cancel joined ride');
        return res.status(404).json({ error: 'Ride not found' });
      }

      console.log('✅ User removed from joinedUsers & seat incremented');
      return res.status(200).json({ message: 'Joined ride canceled successfully', updatedRide });
    } else {
      return res.status(400).json({ error: 'Invalid ride type provided' });
    }
  } catch (err) {
    console.error('🔥 Cancel Ride Error:', err);
    return res.status(500).json({ error: 'Internal server error during cancellation' });
  }
};
