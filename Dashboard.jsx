

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import '../assets/Dashboard.css';
import '../assets/RideCard.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../firebase/firebase';
import axios from 'axios';
import './Dash.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [rides, setRides] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // 🔁 listen for route changes

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('Auth State:', currentUser);
    });
    return () => unsubscribe();
  }, []);

 
  useEffect(() => {
    const fetchRides = async () => {
      try {
        const res = await axios.get('http://localhost:5050/api/rides');
        setRides(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch rides:', err.message);
      }
    };

    fetchRides();
  }, [location]);

const handleJoinRide = async (rideId) => {
  if (!user) {
    alert('⚠️ Please login to join a ride.');
    return;
  }

  try {
    const res = await axios.patch(`http://localhost:5050/api/rides/${rideId}/join`, {
      email: user.email
    });

    const updatedRide = res.data;
    setRides((prevRides) =>
      prevRides.map((r) => (r._id === updatedRide._id ? updatedRide : r))
    );

    alert('✅ You successfully joined the ride!');
  } catch (err) {
    console.error('Error joining ride:', err.response?.data || err.message);
    alert(err.response?.data?.message || '❌ Failed to join ride.');
  }
};

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h2>Available Rides</h2>
        {rides.length === 0 ? (
          <p>No rides available right now.</p>
        ) : (
          rides.map((ride) => (
            <div key={ride._id} className="ride-card">
              <h3>{ride.from} → {ride.to}</h3>
              <p>Date: {ride.date}</p>
               
     <p>
  📞 <strong> contact: {ride.contact}</strong>
</p>

              <p>Fare: ₹{ride.fare}</p>

              <p>Time: {ride.time}</p>
              
              <p>Persons Joined: {ride.personJoined}</p>
              <p>Available Seats: {ride.seatsAvailable}</p>
              <p>Posted By: {ride.email}</p>
              <button onClick={() => handleJoinRide(ride._id)}>Join Ride</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
