// front/src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Sidebar.css';
import { signOut } from 'firebase/auth';
import auth from '../firebase/firebase'; // your firebase config
import { useNavigate } from 'react-router-dom';



function Sidebar() {
  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await signOut(auth);
    // Use timeout to allow alert before navigation
    setTimeout(() => {
      alert('👋 You’ve been logged out.');
      navigate('/register'); // Or navigate('/login') if that’s your entry point
    }, 100);
  } catch (error) {
    console.error('Logout error:', error.message);
    alert('❌ Something went wrong while logging out.');
  }
};

  return (
    <div className="sidebar">
      <h3>Navigation</h3>
     
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/post-ride">Post Journey</Link></li>
        <li><Link to="/my-journey">My Journey</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      
        <button onClick={handleLogout} style={{ color: 'red', fontWeight: 'bold' }}>
  Logout
</button>
      </ul>
    </div>
  );
}

export default Sidebar;
