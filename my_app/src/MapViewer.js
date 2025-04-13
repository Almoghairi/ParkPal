import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import ImgMediaCard from './Card';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

function Map() {
  const [map] = useState(
    'https://i2.wp.com/www.mybigfathalalblog.com/wp-content/uploads/2015/01/Screen_Shot_2016-11-28_at_16.32.18.png'
  );

  const gameImage = ['/pictures/forgotten.png', '/pictures/pharoah.png'];
  const posX = ['50%', '20%']; // x-axis for cards
  const posY = ['100px', '150px']; // y-axis for cards
  const gameTitle = ['The Forgotten Asylum', 'Pharaoh’s Curse'];
  const gameDiscription = [
    'This game is about adventure and fun!',
    'Challenge your skills in this epic game!',
  ];

  const [activeIndex, setActiveIndex] = useState(null); // null = nothing selected

  return (
    <Container  className="vh-100 position-relative">
      {/* Map background */}
      <img src={map} alt="Map"
          style={{ // important for screen sizes
            width: '100%',
            height: 'auto',
            maxWidth: '1000px',
            display: 'block',
          }} />

      {/* Map Pointers -> location marks*/}
      {posX.map((left, index) => (
        <FontAwesomeIcon
              icon={faMapMarkerAlt} // pre built icon (location)
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
              style={{
                position: 'absolute',
                top: `${parseInt(posY[index]) - 30}px`,
                left: posX[index],
                zIndex: 998,
                cursor: 'pointer',
                fontSize: '32px',
                color: 'black',
              }}
            />
      ))}

      {/* Show selected card */}
      {activeIndex !== null && (
        <motion.div // simple animation 
            key={activeIndex} 
            style={{ // setting the position of the card
                position: 'absolute',
                top: posY[activeIndex],
                left: posX[activeIndex],
                zIndex: 999, // to override the map
            }}
            initial={{ opacity: 0, y: 20 }} // slide up 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: 'easeOut' }} 
        >
          {/* Card detail */}
          <ImgMediaCard 
            title={gameTitle[activeIndex]}
            discription={gameDiscription[activeIndex]}
            image={gameImage[activeIndex]}
          />
        </motion.div>
      )}
    </Container>
  );
}

export default Map;

