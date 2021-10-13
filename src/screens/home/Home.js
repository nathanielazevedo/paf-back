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
          {/* <Robot/> */}
          <ambientLight intensity={0.1}/>
          <pointLight position={[10, 10, 10]} intensity={0.5} />
        </Canvas>
  )
}

function Home() {
  return (
    <div className="home-container">
      <div className="top-section">
        <div className="quote"><span>Talk</span> <span className="">to a</span> Spanish Speaking <span className="green">Robot</span></div>
      </div>
      <div className="middle-section">
      <div>
        <div className="check-section">
         <i className="fas fa-check green"></i>
          <h2>Always have a speaking partner that's ready to talk</h2> 
        </div>
        <div className="check-section">
          <i className="fas fa-check green"></i>
          <h2>Converse at a level you're comfortable with</h2> 
        </div>
        <div className="check-section">
          <i className="fas fa-check green"></i>
          <h2>Improve your real conversation rythm</h2> 
        </div>
      </div>
      </div>
      <div className="bottom-section">
        <div className="footer-right">
          <h5>Developed by: Nate Azevedo</h5>
          <div style={{padding: '20px 0 0 0'}}>
            <span className="connect">Let's connect! - </span> <a href="https://www.linkedin.com/in/nateazevedo/" className="linkedin green">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
