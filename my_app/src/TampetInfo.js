import React, { useState } from 'react';
import './info.css';

function Tampet() {
    const [flipped, setFlipped] = useState(false);
  
    const toggleFlip = () => {
      setFlipped(!flipped);
    };
  
    return (
      <div className="forgotten-container d-flex justify-content-center align-items-center">
        <div className={`flip-card ${flipped ? 'flipped' : ''}`} onClick={toggleFlip}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="hover-icon">🔄</div>
              <img src="/pictures/tampet.png" alt="The Tampet’s Wrath" style={{ borderRadius: '18px' }}/>
            </div>
            <div className="flip-card-back">
              <h2>The Tempest’s Wrath</h2>
              <p>
              Board a ghost ship caught in an eternal storm on the open sea. This high-thrill water 
              coaster tosses riders through torrential rain, lightning strikes, and massive waves—all 
              inside a fully immersive dome. As you descend into the eye of the storm, strange sea 
              creatures emerge from the depths, challenging your courage with every twist and turn.
              </p>
              <ul>
                <li>Minimum Height: 140 cm</li>
                <li>Minimum Age: 14</li>
                <li><strong>Not recommended</strong> for guests prone to motion sickness or with back
                 problems
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
export default Tampet;