import React, { useState } from 'react';
import './info.css';

function Inferno() {
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
              <img src="/pictures/inferno.png" alt="Inferno Spiral" style={{ borderRadius: '18px' }}/>
            </div>
            <div className="flip-card-back">
              <h2>Inferno Spiral</h2>
              <p>
              A towering, 360-degree rotating roller coaster that simulates a fall into the underworld. 
              Plunge through rings of fire, spin through hellish landscapes, and ride the blazing loop 
              of judgment. Heat effects and visual illusions create the sense of being trapped in a 
              firestorm with no escape.
              </p>
              <ul>
                <li>Minimum Height: 160 cm</li>
                <li>Minimum Age: 17</li>
                <li><strong>Not recommended</strong> for guests with epilepsy or heat sensitivity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
export default Inferno;