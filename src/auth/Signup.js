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
      <form className="login-form">
        <input
          className="login-input"
          value={formData.username}
          name="username"
          onChange={(e) => handleChange(e)}
          placeholder="username"
        />
        <input
          className="login-input"
          value={formData.password}
          name="password"
          onChange={(e) => handleChange(e)}
          placeholder="password"
        />
  
        <input
          className="login-input"
          value={formData.firstName}
          name="firstName"
          onChange={(e) => handleChange(e)}
          placeholder="first name"
        />

        <input
          className="login-input"
          value={formData.lastName}
          name="lastName"
          onChange={(e) => handleChange(e)}
          placeholder="last name"
        />
        <input
          className="login-input"
          value={formData.email}
          name="email"
          onChange={(e) => handleChange(e)}
          placeholder="email"
        />
        <button onClick={() => signupFunc(formData)} className="login-submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
