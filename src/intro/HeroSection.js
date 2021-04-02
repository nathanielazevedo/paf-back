/** @format */

import React from "react";
import { Button } from "../button/Button";
import "./HeroSection.css";
import "../App.css";



function HeroSection() {
  return (
    <div className="hero-container">
      <h1>PROGRAM A FRIEND</h1>
      <p>To learn with, cope with, laugh with.</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
