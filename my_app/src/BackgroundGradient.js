import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

const BackgroundAnimation = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/background/Animation.json')
      .then(res => res.json())
      .then(data => setAnimationData(data));
  }, []);

  if (!animationData) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: -20,
      overflow: 'hidden',
      width: '100vw',
      height: '100vh',
    }}>
      <Lottie 
        animationData={animationData}
        loop
        style={{
          width: '100%',
          height: '100%',
          transform: 'scale(4)', //  SVG/canvas stretch
        }}
      />
    </div>
  );
};

export default BackgroundAnimation;
