

import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './MyJourney.css';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../firebase/firebase';
import axios from 'axios';

function MyJourney() {
  const [user, setUser] = useState(null);
  const [postedRides, setPostedRides] = useState([]);
  const [joinedRides, setJoinedRides] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchJourneys(currentUser.email);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchJourneys = async (email) => {
    try {
      const res = await axios.get(`http://localhost:5050/api/journeys/${email}`);
      setPostedRides(res.data.posted || []);
      setJoinedRides(res.data.joined || []);
    } catch (err) {
      console.error('❌ Failed to fetch journeys:', err.message);
    }
  };

  return (
    <div className="journey-layout">
      <Sidebar />
      <main className="journey-main">
        <h2>Rides You Posted</h2>
        {postedRides.length === 0 ? (
          <p>No posted rides yet.</p>
        ) : (
          postedRides.map((ride) => (
            <div className="journey-card" key={ride._id}>
              <h3>{ride.from} → {ride.to}</h3>
              <p>{ride.date} at {ride.time}</p>
              <p>Seats Available: {ride.seatsAvailable}</p>
            </div>
          ))
        )}

        <h2>Rides You Joined</h2>
        {joinedRides.length === 0 ? (
          <p>No joined rides yet.</p>
        ) : (
          joinedRides.map((ride) => (
            <div className="journey-card" key={ride._id}>
              <h3>{ride.from} → {ride.to}</h3>
              <p>{ride.date} at {ride.time}</p>
              <p>Posted By: {ride.email}</p>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default MyJourney;
