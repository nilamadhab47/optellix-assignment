import React from "react";
import { useGLTF, Html } from "@react-three/drei";
import * as THREE from "three";
import Draggable from "react-draggable";

const Landmark = ({ position, onDrag }) => (
  <Draggable position={{ x: position[0], y: position[1] }} onDrag={onDrag}>
    <Html>
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: 'red',
        }}
      />
    </Html>
  </Draggable>
);
// console.log(Landmark);

export function Model({ nodes, landmarkPositions, onLandmarkDrag }) {
  // const { nodes, materials } = useGLTF("/femures.glb");
  const newMaterial = new THREE.MeshStandardMaterial({
    color: "#31b7a8", // Set the color to #31b7a8
  });
  

  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Right_Femur.geometry}
        material={newMaterial}
        scale={0.018}
       
      />
      {Object.entries(landmarkPositions).map(([name, position], index) => (
        <Landmark
          key={index}
          position={position}
          onDrag={(e, data) => onLandmarkDrag(name, data)}
        />
      ))}
    </group>
  );
}

export default Model;
