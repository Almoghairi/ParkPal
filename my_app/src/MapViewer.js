import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import ImgMediaCard from './Card';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

function Map() {
  const [map] = useState('/pictures/ParkMAP');
  const gameImage = ['/pictures/Unknown-4', '/pictures/Unknown-5','/pictures/Unknown-12','/pictures/Unknown-13', '/pictures/Unknown-11'];
  const posX = ['30%', '25%','75%','70%','30%']; // x-axis as percentages
  const posY = ['20%', '50%', '70%', '15%', '70%']; // y-axis also as percentages
  const gameTitle = ['Game 1', 'Game 2','Game 3','Game 4','Game 5'];
  const gameDiscription = [
    'This game is about adventure and fun!',
    'Challenge your skills in this epic game!',
    'This game is about adventure and fun!',
    'Challenge your skills in this epic game!',
    'This game is about adventure and fun!',
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    
    <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: .8, ease: 'easeOut' }}
    >
        <Container className="vhd-100 d-flex justify-content-center">
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: '1200px', 
          minWidth: '600px',
          minHeight: '600px',
          aspectRatio: '16/9' 
        }}>
          <img
            src={map}
            alt="Map"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />

          {posX.map((left, index) => (
            <FontAwesomeIcon
              key={`marker-${index}`}
              icon={faMapMarkerAlt}
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
              style={{
                position: 'absolute',
                top: posY[index],
                left: left,
                transform: 'translate(-50%, -100%)', // center above location
                zIndex: 998,
                cursor: 'pointer',
                fontSize: '32px',
                color: 'black',
              }}
            />
          ))}

          {activeIndex !== null && (
            <motion.div
              key={activeIndex}
              style={{
                position: 'absolute',
                top: posY[activeIndex],
                left: posX[activeIndex],
                transform: 'translate(-50%, 0)',
                zIndex: 999,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
            >
              <ImgMediaCard
                title={gameTitle[activeIndex]}
                discription={gameDiscription[activeIndex]}
                image={gameImage[activeIndex]}
              />
            </motion.div>
          )}
        </div>
      </Container>
    </motion.div>
  );
}

export default Map;
