import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const DotParticles = () => {
  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true },
        background: { color: { value: 'transparent' } },
        particles: {
          number: { value: 60, density: { enable: true, area: 800 } },
          color: { value: '#ffffff' },   // dark for contrast
          shape: { type: 'circle' },
          opacity: { value: 0.3 },
          size: { value: 2 },
          move: { enable: true, speed: 0.5, outModes: { default: 'out' } },
        },
        detectRetina: true,
      }}
    />
  );
};

export default DotParticles;
