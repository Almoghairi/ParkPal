import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

function ParkAnimation() {
  const container = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: process.env.PUBLIC_URL + '/background/ParkAnimation.json',
    });
    return () => anim.destroy();
  }, []);

  return (
    <div
      ref={container}
      style={{ width: 400, height: 400, margin: 'auto' }}
    />
  );
}
export default ParkAnimation;
