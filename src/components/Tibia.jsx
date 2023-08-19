import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
export function Tibia(props) {
  const { nodes, materials } = useGLTF("/tibia.glb");

  const newMaterial = new THREE.MeshStandardMaterial({
    color: "#9e625c", // Set the color to #31b7a8
  });
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Right_Tibia.geometry}
        material={newMaterial}
        scale={0.018}
        position={[0.5, -6.7, 0]} 
      />
    </group>
  );
}

useGLTF.preload("/tibia.glb");
