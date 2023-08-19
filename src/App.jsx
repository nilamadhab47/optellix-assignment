import React, { Suspense, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, Environment } from "@react-three/drei";
import { Model } from "./components/Femur";
import { LandmarkButton } from "./components/LandmarkButton";
import Draggable from "react-draggable";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { Tibia } from "./components/Tibia";

const landmarkNames = [
  "Femur Center",
  "Hip Center",
  "Femur Proximal Canal",
  "Femur Distal Canal",
  "Medial Epicondyle",
  "Lateral Epicondyle",
  "Distal Medial Pt",
  "Distal Lateral Pt",
  "Posterior Medial Pt",
  "Posterior Lateral Pt",
];

const App = () => {
  const { nodes } = useGLTF("/femures.glb");
  const [landmarkMode, setLandmarkMode] = useState(false);
  const [activeLandmarks, setActiveLandmarks] = useState(
    landmarkNames.reduce((acc, name) => {
      acc[name] = false;
      return acc;
    }, {})
  );
  const [landmarkPositions, setLandmarkPositions] = useState({});
  const canvasRef = useRef();

  const handleLandmarkButtonClick = (name) => {
    setLandmarkMode(!landmarkMode);

    // Toggle the active state for the clicked button
    setActiveLandmarks((prevActiveLandmarks) => ({
      ...prevActiveLandmarks,
      [name]: !prevActiveLandmarks[name],
    }));
  };

  const handleCanvasClick = (event) => {
    const { camera } = useThree(); // Access the camera using useThree hook
    if (landmarkMode) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const mouse = new THREE.Vector2();
      mouse.x = ((event.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / canvas.clientHeight) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects([nodes.Right_Femur]);

      if (intersects.length > 0) {
        const landmarkPosition = intersects[0].point.toArray();
        // Get the name of the currently active landmark
        const activeLandmark = Object.keys(activeLandmarks).find(
          (name) => activeLandmarks[name]
        );
        if (activeLandmark) {
          setLandmarkPositions({
            ...landmarkPositions,
            [activeLandmark]: landmarkPosition,
          });
        }
      }
    }
  };

  const handleLandmarkDrag = (name, data) => {
    // Update the position of the dragged landmark in state
    setLandmarkPositions({
      ...landmarkPositions,
      [name]: [data.x, data.y],
    });
  };

  return (
    <div>
      {landmarkNames.map((name) => (
        <LandmarkButton
          key={name}
          active={activeLandmarks[name]}
          onClick={() => handleLandmarkButtonClick(name)}
          name={name}
        />
      ))}
      <Canvas
        style={{ height: "700px", width: "100vw", margin: "0 auto" }}
        onClick={handleCanvasClick}
        ref={canvasRef}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[4, 25, 11]} />
        <perspectiveCamera position={[4, 25, 11]} />
        {/* Add OrbitControls */}
        <OrbitControls />

        <Suspense fallback={<Html>Loading...</Html>}>
          <Model
            nodes={nodes}
            landmarkPositions={landmarkPositions}
            onLandmarkDrag={handleLandmarkDrag}
          />
          <Tibia />
        </Suspense>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default App;
