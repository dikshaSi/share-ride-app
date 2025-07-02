// front/src/App.jsx
// front/src/App.jsx



import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard'; // moved from pages to components
import PostRide from './components/PostRide';   // if you place this in components
import MyJourney from './components/MyJourney';
import Profile from './components/Profile';
import Home from './components/Home';
import Footer from './components/Footer'; // Ensure you have a Footer component
import CancelRide from './components/CancelRide';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post-ride" element={<PostRide />} />
        <Route path="/my-journey" element={<MyJourney />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cancel-ride" element={<CancelRide />} />

      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
