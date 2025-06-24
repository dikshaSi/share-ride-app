import React from 'react';
import { Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import homeBanner from '../assets/home-banner.jpg'; // adjust path if needed
import './Home.css'; // optional, if you want to style it

function Home() {
   const navigate = useNavigate();
   const handlefun =()=>{
    navigate('/register');
   };
  return (
     
    <div className="home">
      
      <img src={homeBanner} alt="Campus Ride Banner" className="home-banner" />
      <br/>
      
       <button  id="button" onClick={handlefun} style={{backgroundColor:'sky blue',textColor:'white'}} >Join Ride </button>
   <div className="why-slider-section">
  <h2 className="why-heading">✨ Why Should You Join?</h2>
  <div className="why-slider">
    <div className="why-slide-track">
      <div className="why-slide">💰 Cost Saving</div>
      <div className="why-slide">⏱️ Time Saving</div>
      <div className="why-slide">🚌 No Wait Time</div>
      <div className="why-slide">🌍 Eco Travel</div>
      <div className="why-slide">🤝 Meet People</div>

      {/* Repeat for seamless loop */}
      <div className="why-slide">💰 Cost Saving</div>
      <div className="why-slide">⏱️ Time Saving</div>
      <div className="why-slide">🚌 No Wait Time</div>
      <div className="why-slide">🌍 Eco Travel</div>
      <div className="why-slide">🤝 Meet People</div>
    </div>
  </div>
</div>


     
    </div>
  );
}

export default Home;
 