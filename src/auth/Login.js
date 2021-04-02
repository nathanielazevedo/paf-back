/** @format */

import React from "react";
import "./Login.css";
import Form from "../form/Form";

function Login({ loginFunc }) {
  return (
    <div className="login-container">
      <Form title="Login" inputs={["username", "password"]} func={loginFunc} />
    </div>
  );
}

export default Login;
