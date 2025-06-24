
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import '../assets/Form.css';
import './Postride.css';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../firebase/firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PostRide() {
  const navigate = useNavigate();

 const [ride, setRide] = useState({
  from: '',
  to: '',
  time: '',
  seatsAvailable: '',
  fare: '',
  date: '',           // ➕ Add this
  contact: ''         // ➕ And this
});


  const [email, setEmail] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        alert('Please log in to post a ride.');
        navigate('/login');
      } else {
        setEmail(currentUser.email);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (e) => {
    setRide({ ...ride, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const rideData = {
    from: ride.from,
    to: ride.to,
    time: ride.time,
    fare: ride.fare,
    seatsAvailable: Number(ride.seatsAvailable),
    date: ride.date,
    contact: ride.contact,
    personJoined: 1,       // ✅ Add this line
    email
  };

  try {
    console.log('📦 Sending rideData:', rideData);

    await axios.post('http://localhost:5050/api/rides', rideData, {
      headers: { 'Content-Type': 'application/json' }
    });

    alert('✅ Ride posted successfully!');
    navigate('/dashboard');
  } catch (err) {
    console.error('❌ Error posting ride:', err.response?.data || err.message);
    alert('❌ Failed to post ride.');
  }
};


  return (
    <div className="post-ride-container">
      <h2>Post a Ride</h2>
      <form onSubmit={handleSubmit} className="post-ride-form">
        <input type="text" name="from" placeholder="From" onChange={handleChange} required />
        <input type="text" name="to" placeholder="To" onChange={handleChange} required />
        <input type="text" name="fare" placeholder="Fare" onChange={handleChange} required />
        <input type="text" name="time" placeholder="Time" onChange={handleChange} required />
        <input type="text" name="date" placeholder="Date (YYYY-MM-DD)" onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Your Contact Number" onChange={handleChange} required />

        <input type="number" name="seatsAvailable" placeholder="Seats" onChange={handleChange} required />
        <button type="submit">Post Ride</button>
      </form>
    </div>
  );
}

export default PostRide;
