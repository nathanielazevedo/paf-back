/** @format */

import React, {useState} from "react";
import "./Login.css";

//Loginfunc is passed down from App.js as a prop. This component passes the loginfunc down to the form.
function Login({loginFunc}) {
  let [formData, setFormData] = useState({username: "", password: ""});

  function handleChange(e) {
    let {name, value} = e.target;
    setFormData((old) => ({
      ...old,
      [name]: value,
    }));
  }

  return (
    <div className="login-container">
      <form className="login-form">
        <h3 className="login-title">Login</h3>
        <input
          className="login-input"
          value={formData.username}
          name="username"
          onChange={(e) => handleChange(e)}
        />
        <input
          className="login-input"
          value={formData.password}
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <button onClick={() => loginFunc(formData)}>Login</button>
      </form>
    </div>
  );
}

export default Login;
