/** @format */

import React from "react";
import "./Login.css";
import Form from "../form/Form";

//Loginfunc is passed down from App.js as a prop. This component passes the loginfunc down to the form.

function Login({ loginFunc }) {
  return (
    <div className="login-container">
      <Form title="Login" inputs={["username", "password"]} func={loginFunc} close={null}/>
    </div>
  );
}

export default Login;
