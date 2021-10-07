/** @format */

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

//Simply renders App wrapped in BrowserRouter as Router.

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
