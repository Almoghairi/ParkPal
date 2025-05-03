import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import ImgMediaCard from './Card';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

function Map() {
  const [map] = useState('/pictures/lastmap.png');
  const gameImage = ['/pictures/forgotten.png', '/pictures/tampet.png','/pictures/inferno.png','/pictures/cryzone.png', '/pictures/pharoah.png'];
  const posX = ['30%', '20%','80%','77%','35%']; // x-axis as percentages
  const posY = ['20%', '50%', '70%', '15%', '72%']; // y-axis also as percentages
  const gameTitle = ['The Forgotten Asylum', 'The Tempest’s Wrath','Inferno Spiral','CryzoneX','Pharaoh’s Curse'];

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    
    <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
    >
        <Container className="vhd-100 mt-5 d-flex justify-content-center">
        <div style={{ 
          position: 'relative',
          width: '100%',
          maxWidth: '1200px',
          minWidth: '600px',
          aspectRatio: '16 / 9',
          borderRadius: '24px',
          overflow: 'hidden', // cut it off the image is larger than the widthXheight
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)', 
          backdropFilter: 'blur(10px)', // blur
          background: 'rgba(255, 255, 255, 0.05)', // light frosted glass
          border: '1px solid rgba(255, 255, 255, 0.1)', // subtle outline
        }}>
          <img
            src={map}
            alt="Map"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'fill',
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
                top: '30%',
                left: '40%',
                transform: 'translate(-50%, -50%)', // center the imageCard
                zIndex: 999,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
            >
              <ImgMediaCard
                title={gameTitle[activeIndex]}
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
