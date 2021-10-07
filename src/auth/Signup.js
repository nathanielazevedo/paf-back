/** @format */

import React, {useState} from "react";
import "./Signup.css";

//SignupFunc is passed down from App.js as a prop. This component passes the signupFunc down to the form.

function Signup({signupFunc}) {
  let [formData, setFormData] = useState({username: "", password: "", email: "", firstName:"", lastName:""});

  function handleChange(e) {
    let {name, value} = e.target;
    setFormData((old) => ({
      ...old,
      [name]: value,
    }));
  }
  return (
    <div className="signup-container">
      <form className="signup-form">
        <h3 className="signup-title">Sign Up</h3>
        <input
          className="signup-input"
          value={formData.username}
          name="username"
          onChange={(e) => handleChange(e)}
        />
        password
        <input
          className="signup-input"
          value={formData.password}
          name="password"
          onChange={(e) => handleChange(e)}
        />
        firstname
        <input
          className="signup-input"
          value={formData.firstName}
          name="firstName"
          onChange={(e) => handleChange(e)}
        />
        lastname
        <input
          className="signup-input"
          value={formData.lastName}
          name="lastName"
          onChange={(e) => handleChange(e)}
        />
        email
        <input
          className="signup-input"
          value={formData.email}
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <button onClick={() => signupFunc(formData)}>Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
