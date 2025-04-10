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
  const points = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(5, 2, -5),
    new THREE.Vector3(10, 0, -10),
    new THREE.Vector3(15, 3, -15),
  ];

  const curve = new THREE.CatmullRomCurve3(points);
  const offset = 0.3; // distance between the left and right rails

  return (
    <>
      {/* === Left Rail === */}
      <mesh position={[-offset, 0, 0]}>
        <tubeGeometry args={[curve, 100, 0.05, 8, false]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* === Right Rail === */}
      <mesh position={[offset, 0, 0]}>
        <tubeGeometry args={[curve, 100, 0.05, 8, false]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* === Segmented Bottom Support Bar === */}
      {Array.from({ length: 40 }, (_, i) => {
        const t1 = i / 40;
        const t2 = (i + 1) / 40;
        const p1 = curve.getPointAt(t1);
        const p2 = curve.getPointAt(t2);

        const seg = new THREE.LineCurve3(p1, p2);
        const tube = new THREE.TubeGeometry(seg, 1, 0.03, 6, false);

        return (
          <mesh key={`bottom-${i}`} geometry={tube} position={[0, -0.1, 0]}>
            <meshStandardMaterial color="gray" />
          </mesh>
        );
      })}

      {/* === Cross Connectors Between Rails === */}
      {Array.from({ length: 20 }, (_, i) => {
  const t = i / 20;
  const center = curve.getPointAt(t);

  const left = center.clone().add(new THREE.Vector3(-offset, 0, 0));
  const right = center.clone().add(new THREE.Vector3(offset, 0, 0));
  const dip = center.clone().add(new THREE.Vector3(0, -0.15, 0)); // lower middle point

  // Curved connector with 3 points: left -> dip -> right
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

  