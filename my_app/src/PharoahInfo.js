import React, { useState } from 'react';
import './info.css';

function Pharoah() {
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
              <img src="/pictures/pharoah.png" alt="Pharaoh’s Curse" style={{ borderRadius: '18px' }}/>
            </div>
            <div className="flip-card-back">
              <h2>Pharaoh’s Curse</h2>
              <p>
              Descend beneath the sands into the hidden tomb of a forgotten Pharaoh. This dark ride 
              combines trackless vehicles and interactive puzzles. Solve riddles to escape the 
              ever-closing tomb walls, dodge ancient traps, and avoid awakening the mummified king
              who guards his treasures with a deadly curse.
              </p>
              <ul>
                <li>Minimum Height: 130 cm</li>
                <li>Minimum Age: 12</li>
                <li><strong>Not recommended</strong> for guests with claustrophobia or fear of the dark
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
export default Pharoah;