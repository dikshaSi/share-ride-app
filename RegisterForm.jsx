
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import './Regis.css';
// Ensure you have this CSS file for styling

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enrollment, setEnrollment] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
   if (!/^\d{2}[A-Z]{3}\d{3}$/.test(enrollment)) {
  alert('Please enter a valid enrollment number (e.g., 22UCS079)');
  return;
}


    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      console.log('Registered:', {
        uid: userCredential.user.uid,
        enrollment
      });
      navigate('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
      <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <input type="text" placeholder="Enrollment Number" onChange={(e) => setEnrollment(e.target.value)} required />
        <button type="submit">Register</button>
        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
}

export default RegisterForm;
