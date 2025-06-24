import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import './Header.css';


function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <div className="logo">🚗 ShareRide</div>
      <nav className="nav-section">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/register">Register</Link></li>
           <li><Link to="/login">Login</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/post-ride">Post Ride</Link></li>
          <li><Link to="/my-journey">My Journey</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
       
      </nav>
    </header>
  );
}

export default Header;
