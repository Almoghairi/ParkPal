import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function Coaster() {
  return (
    <div style={{ height: '100vh' }}>
      <Canvas camera={{ position: [0, 5, 25], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        <Track />
        <AnimatedCart />
        <Ground />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

// 🎢 Track made from smooth curve
function Track() {
  const liftY = 1.5;
  const radius = 10;
  const segments = 30;
  const offset = 0.3;
  const heightWave = 2;

  const points = [];
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = liftY + Math.sin(angle * 2) * heightWave;
    points.push(new THREE.Vector3(x, y, z));
  }

  const curve = new THREE.CatmullRomCurve3(points, true);
  const frames = curve.computeFrenetFrames(200, true);

  const leftPoints = [];
  const rightPoints = [];

  for (let i = 0; i <= 200; i++) {
    const t = i / 200;
    const center = curve.getPointAt(t);
    const tangent = frames.tangents[i];
    
    // Restrict tangent to horizontal plane for stable side offset
    const flatTangent = tangent.clone();
    flatTangent.y = 0;
    flatTangent.normalize();

    // Perpendicular vector in horizontal plane (cross up x tangent)
    const up = new THREE.Vector3(0, 1, 0);
    const side = new THREE.Vector3().crossVectors(up, flatTangent).normalize();

    const left = center.clone().add(side.clone().multiplyScalar(-offset));
    const right = center.clone().add(side.clone().multiplyScalar(offset));

    leftPoints.push(left);
    rightPoints.push(right);
  }

  const leftCurve = new THREE.CatmullRomCurve3(leftPoints);
  const rightCurve = new THREE.CatmullRomCurve3(rightPoints);

  return (
    <>
      {/* === Left Rail === */}
      <mesh>
        <tubeGeometry args={[leftCurve, 200, 0.05, 8, false]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* === Right Rail === */}
      <mesh>
        <tubeGeometry args={[rightCurve, 200, 0.05, 8, false]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* === Bottom Support Bars === */}
      {Array.from({ length: 40 }, (_, i) => {
        const t1 = i / 40;
        const t2 = (i + 1) / 40;
        const p1 = curve.getPointAt(t1).clone().add(new THREE.Vector3(0, -0.2, 0));
        const p2 = curve.getPointAt(t2).clone().add(new THREE.Vector3(0, -0.2, 0));

        const seg = new THREE.LineCurve3(p1, p2);
        const tube = new THREE.TubeGeometry(seg, 1, 0.03, 6, false);

        return (
          <mesh key={`bottom-${i}`} geometry={tube}>
            <meshStandardMaterial color="gray" />
          </mesh>
        );
      })}

      {/* === Cross Connectors === */}
      {Array.from({ length: 20 }, (_, i) => {
        const t = i / 20;
        const center = curve.getPointAt(t);
        const tangent = curve.getTangentAt(t).normalize();
        const up = new THREE.Vector3(0, 1, 0);
        const cross = new THREE.Vector3().crossVectors(up, tangent).normalize();

        const left = center.clone().add(cross.clone().multiplyScalar(-offset));
        const right = center.clone().add(cross.clone().multiplyScalar(offset));
        const dip = center.clone().add(new THREE.Vector3(0, -0.15, 0));

        const curvedConnector = new THREE.CatmullRomCurve3([left, dip, right]);
        const connectorTube = new THREE.TubeGeometry(curvedConnector, 10, 0.02, 6, false);

        return (
          <mesh key={`cross-${i}`} geometry={connectorTube}>
            <meshStandardMaterial color="gray" />
          </mesh>
        );
      })}
    </>
  );
}


// 🚗 Cart moving along the track
function AnimatedCart() {
  const cartRef = useRef();
  const curveRef = useRef(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(5, 3, -5),
      new THREE.Vector3(10, 1, -10),
      new THREE.Vector3(15, 4, -15),
    ])
  );

  let t = useRef(1);

  useFrame(() => {
    if (cartRef.current) {
      t.current -= 0.005;
      if (t.current < 0) t.current = 1;

      const pos = curveRef.current.getPointAt(t.current);
      const tangent = curveRef.current.getTangentAt(t.current).normalize();

      cartRef.current.position.copy(pos);

      const axis = new THREE.Vector3(0, 1, 0);
      const up = new THREE.Vector3(0, 1, 0);
      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        up,
        tangent
      );
      cartRef.current.quaternion.copy(quaternion);
      cartRef.current.position.y +=0.15;
    }
  });

  return (
    <mesh ref={cartRef}>
      <cylinderGeometry args={[0.1, 0.1, 1, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

// 🌱 Ground plane
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
      <planeGeometry args={[25, 25]} />
      <meshStandardMaterial color="lightgreen" />
    </mesh>
  );
}

  