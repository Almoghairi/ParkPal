import React, { useState } from 'react';
import './info.css';

function ForgottenAsylum() {
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
              <img src="/pictures/forgotten.png" alt="The Forgotten Asylum"/>
            </div>
            <div className="flip-card-back">
              <h2>The Forgotten Asylum</h2>
              <p>
                Enter an abandoned asylum where the spirits of former patients still linger.
                Riders venture through dark hallways, sudden drops, and eerie rooms filled with
                whispering voices, flickering lights, and shadowy figures that move just out of sight.
                The deeper you go, the more the asylum comes to life—until the spirits decide you can 
                never leave!
              </p>
              <ul>
                <li>Minimum Height: 165 cm</li>
                <li>Minimum Age: 18</li>
                <li><strong>Not recommended</strong> for guests with heart conditions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
export default ForgottenAsylum;