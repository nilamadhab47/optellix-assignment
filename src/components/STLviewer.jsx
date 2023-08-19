import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, primitive } from '@react-three/drei';

const Femur = () => {
  const { nodes } = useGLTF('path/to/Femur.glTF');
  return <primitive object={nodes.Femur} />;
};

const Tibia = () => {
  const { nodes } = useGLTF('path/to/Tibia.glTF');
  return <primitive object={nodes.Tibia} />;
};

const App = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Femur />
      <Tibia />
    </Canvas>
  );
};

export default App;
