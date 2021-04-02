/** @format */

import React from "react";
import "./Signup.css";
import Form from "../form/Form";

function Signup({ signupFunc }) {
  return (
    <div className="signup-container">
      <Form
        title="Sign Up"
        inputs={["username", "password", "email", "firstName", "lastName"]}
        func={signupFunc}
        after='/friends'
      />
    </div>
  );
}

export default Signup;
