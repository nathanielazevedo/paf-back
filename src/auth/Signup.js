/** @format */

import React from "react";
import "./Signup.css";
import Form from "../form/Form";

//SignupFunc is passed down from App.js as a prop. This component passes the signupFunc down to the form.

function Signup({ signupFunc }) {
  return (
    <div className="signup-container">
      <Form
        title="Sign Up"
        inputs={["username", "password", "email", "firstName", "lastName"]}
        func={signupFunc}
        after="/paf-front-end/friends"
      />
    </div>
  );
}

export default Signup;
