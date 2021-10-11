/** @format */

import React from "react";
import "./Home.css";
import "../../App.css";
import {Canvas, useLoader, useFrame} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {OrbitControls} from "@react-three/drei";

//Basic hero section

function Robot() {
  const gltf = useLoader(GLTFLoader, "/robot/scene.gltf");
  useFrame(() => {

    gltf.scene.rotation.y += 0.009

    });

  return (
    <primitive object={gltf.scene} scale={[20, 20, 20]} position={[0,2,0]}/>
  );
}

function ThreeD(){
  return(
        <Canvas className="robot"camera={{ position: [5, 0, 0] }} >
          <OrbitControls
            enablePan={true}
            enableZoom={false}
            enableRotate={true}
          />
          <Robot/>
          <ambientLight intensity={0.9}/>
          <pointLight position={[10, 10, 10]} intensity={0.9} />
        </Canvas>
  )
}

function Home() {
  return (
    <div className="home-container">
      <div className="quote"><span>Program</span> <span className="your-own">your own</span> Spanish speaking <span className="robot-text">robot</span></div>
      <div className="robot-container">
      <ThreeD/>
      </div>
    </div>
  );
}

export default Home;
