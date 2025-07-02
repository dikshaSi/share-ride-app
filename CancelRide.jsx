import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './CancelRide.css';
import auth from '../firebase/firebase';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';

function CancelRide() {
  const [user, setUser] = useState(null);
  const [posted, setPosted] = useState([]);
  const [joined, setJoined] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        fetchData(u.email);
      }
    });
    return () => unsub();
  }, []);

  const fetchData = async (email) => {
    try {
      const res = await axios.get(`http://localhost:5050/api/journeys/${email}`);
      setPosted(res.data.posted || []);
      setJoined(res.data.joined || []);
    } catch (err) {
      console.error('❌ Fetch error:', err);
    }
  };

  const handleCancelRide = async (rideId, type) => {
    if (!user) return;

    try {
      await axios.patch('http://localhost:5050/api/cancelride', {
        rideId,
        userEmail: user.email,
        type, // ✅ Important: send 'posted' or 'joined' to backend
      });

      // ✅ Remove from UI
      if (type === 'posted') {
        setPosted((prev) => prev.filter((ride) => ride._id !== rideId));
      } else if (type === 'joined') {
        setJoined((prev) => prev.filter((ride) => ride._id !== rideId));
      }
    } catch (err) {
      console.error('❌ Cancel ride failed:', err.message);
    }
  };

  return (
    <div className="cancel-layout">
      <Sidebar />
      <main className="cancel-main">
        <h2 className="cancel-title">Your Active Rides</h2>

        <section>
          <h3 className="section-subtitle">Rides You Posted</h3>
          <div className="ride-grid">
            {posted.length === 0 ? (
              <p>No posted rides.</p>
            ) : (
              posted.map((ride) => (
                <div className="ride-card" key={ride._id}>
                  <h4>{ride.from} → {ride.to}</h4>
                  <p>{ride.date} at {ride.time}</p>
                  <p>Seats Available: {ride.seatsAvailable}</p>
                  <button
                    className="cancel-btn"
                    onClick={() => handleCancelRide(ride._id, 'posted')}
                  >
                    Cancel Ride
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        <section>
          <h3 className="section-subtitle">Rides You Joined</h3>
          <div className="ride-grid">
            {joined.length === 0 ? (
              <p>No joined rides.</p>
            ) : (
              joined.map((ride) => (
                <div className="ride-card" key={ride._id}>
                  <h4>{ride.from} → {ride.to}</h4>
                  <p>{ride.date} at {ride.time}</p>
                  <p>Posted By: {ride.email}</p>
                  <button
                    className="cancel-btn"
                    onClick={() => handleCancelRide(ride._id, 'joined')}
                  >
                    Cancel Ride
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default CancelRide;
