import * as THREE from 'three';

let sharedCurve = null;
let sharedPoints = null;
export default function CurveSingleton({
    segments = 30,
    radius = 10,
    liftY = 4,
    heightWave = 2
  } = {}) { 
    if (!sharedCurve || !sharedPoints) {
      const arr = [];
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = liftY + Math.sin(angle * 2) * heightWave;
        arr.push(new THREE.Vector3(x, y, z));
      }
      sharedPoints = arr;
      sharedCurve = new THREE.CatmullRomCurve3(sharedPoints, true);
    }
  
    return {
      points: sharedPoints,
      curve: sharedCurve
    };
  }
  