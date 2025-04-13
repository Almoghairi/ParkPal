import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls ,  Reflector } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';
import CurveSingleton from './curve';

export default function Coaster() {
  return (
    <div style={{ height: '100vh' }}>
      <Canvas shadows camera={{ position: [4, 4, 32], fov: 125 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 20, 10]} intensity={1.2} />
        <Track />
        <AnimatedCart />
        <GrassField />
        <Ground />
      </Canvas>
    </div>
  );
}

// Track 
function Track() {

  const { curve,points } = CurveSingleton();
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
      {/* === Segmented Bottom Support Bars (fully follow curve) === */}
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

      {/* === Cross Connectors Between Rails (fully follow curve) === */}
      {Array.from({ length: 20 }, (_, i) => {
  const t = i / 20;
  const center = curve.getPointAt(t);
  const tangent = curve.getTangentAt(t).normalize();

  // Create a side vector (perpendicular to tangent)
  const up = new THREE.Vector3(0, 1, 0);
  const cross = new THREE.Vector3().crossVectors(up, tangent).normalize();

  const left = center.clone().add(cross.clone().multiplyScalar(-offset));
  const right = center.clone().add(cross.clone().multiplyScalar(offset));
  const dip = center.clone().add(new THREE.Vector3(0, -0.15, 0));

  const curvedConnector = new THREE.CatmullRomCurve3([left, dip, right]);
  const connectorTube = new THREE.TubeGeometry(curvedConnector, 10, 0.02, 6, false);

  return (
    <mesh castShadow key={`cross-${i}`} geometry={connectorTube}>
      <meshStandardMaterial color="gray" />
    </mesh>
  );
  
})
}
      {/* === Vertical Support Pillars === */}
      {Array.from({ length: 30 }, (_, i) => {
        const t = i / 30;
        const point = curve.getPointAt(t);
        const groundY = 0;

        const height = point.y - groundY;
        const position = new THREE.Vector3(point.x, groundY + height / 2, point.z);

        return (
          <mesh key={`pillar-${i}`} position={position}>
            <cylinderGeometry args={[0.05, 0.05, height, 6]} />
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
  const t = useRef(1);

  const { curve, points } = CurveSingleton();

  const { scene } = useGLTF('/models/roller_coaster_cart.glb');
// ✅ points to public/models

const frames = useMemo(() => curve.computeFrenetFrames(1000, true), [curve]);

useFrame(() => {
  if (!cartRef.current) return;

  t.current = (t.current + 0.005) % 1;

  const pos = curve.getPointAt(t.current);
  const index = Math.floor(t.current * (frames.tangents.length - 1));
  const tangent = frames.tangents[index];
  const normal = frames.normals[index];
  const binormal = frames.binormals[index];

  const matrix = new THREE.Matrix4();
  const basis = new THREE.Matrix4().makeBasis(binormal, normal, tangent); // X=binormal, Y=normal, Z=tangent
  matrix.makeTranslation(pos.x, pos.y + 0.15, pos.z);
  matrix.multiply(basis);

  cartRef.current.matrixAutoUpdate = false;
  cartRef.current.matrix.copy(matrix);
});

  return <group ref={cartRef}>
  <primitive
    object={scene}
    scale={1}
    position={[0, 0, 0]}
  rotation={[0,0,Math.PI/2]}
  />
</group>
}


// 🌱 Ground plane
function Ground() {
  

  return (
    <>
      
        {(Material, props) => (
          <Material
            color="white"
            metalness={0.3}
            roughness={0.2}
            {...props}
          />
        )}
    </>
  );
}
function GrassField() {
  const { scene } = useGLTF('/models/grass2.glb');

  const countX = 5; // tiles across X axis
  const countZ = 5; // tiles across Z axis
  const spacing = 5; // distance between grass patches

  const tiles = useMemo(() => {
    const arr = [];

    for (let x = -countX / 2; x < countX / 2; x++) {
      for (let z = -countZ / 2; z < countZ / 2; z++) {
        arr.push(
          <primitive
            key={`tile-${x}-${z}`}
            object={scene.clone()}
            scale={[8, 8, 8]}
            position={[x * spacing + 5, 0, z * spacing]}
          />
        );
      }
    }

    return arr;
  }, [scene]); // Rebuild only if scene changes

  return <>{tiles}</>;
}

  