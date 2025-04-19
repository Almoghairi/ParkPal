import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

const BackgroundAnimation = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/background/Animation.json')
      .then(res => res.json())
      .then(data => setAnimationData(data));
  }, []);

  if (!animationData) return null; // or a loading spinner

  return (
    <Lottie 
      animationData={animationData} 
      loop 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
      }}
    />
  );
};

export default BackgroundAnimation;
