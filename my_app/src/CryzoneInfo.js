import React, { useState } from 'react';
import './info.css';

function CryzoneX() {
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
              <img src="/pictures/cryzone.png" alt="CryzoneX"/>
            </div>
            <div className="flip-card-back">
              <h2>CryzoneX</h2>
              <p>
              Step into the arctic lab where an experiment went horribly wrong. This indoor,
              high-speed launch coaster takes riders through a frozen research facility overtaken 
              by sentient ice. Expect sudden chills, blinding snow bursts, and near-zero visibility
              tunnels as you race to escape a growing ice storm—and what lurks within it.
              </p>
              <ul>
                <li>Minimum Height: 150 cm</li>
                <li>Minimum Age: 16</li>
                <li><strong>Not recommended</strong> for guests with respiratory conditions or sensitivity to cold</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
export default CryzoneX;