/** @format */

import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import jwt from "jsonwebtoken";
import Paf from "./api.js";
import Routes from "./nav/Routes";
import Navbar from "./nav/Navbar";
import "./App.css";

//API calls for (signup, login, user fetch) are initiated from this container.
//API calls are truly called from the Paf class located in /api.js

function App() {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  //If token is not in state, check local storage and update state. Update Paf class static token variable.
  if (!token && localStorage.getItem("token")) {
    setToken(localStorage.getItem("token"));
    Paf.token = localStorage.getItem("token");
    let { username } = jwt.decode(Paf.token);
    Paf.username = username;
  }

  //LOGIN. Call api -> setToken in state -> set token in localStorage -> Return {"success" : true or false}.
  let handleLogin = async (formData) => {
    try {
      let res = await Paf.login(formData);
      Paf.token = res.token;
      setToken(res.token);
      localStorage.setItem("token", res.token);
      return { success: true };
    } catch (errors) {
      console.error("login failed");
      return { success: false, errors };
    }
  };

  //SIGN UP. Call api -> setToken in state -> set token in localStorage -> Return {"success" : true or false}.
  let handleSignup = async (formData) => {
    try {
      let res = await Paf.signup(formData);
      setToken(res.token);
      localStorage.setItem("token", res.token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed");
      return { success: false, errors };
    }
  };

  //LOGOUT. Clear state and local storage.
  let handleLogout = async () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem("token");
  };

  //If token state changes from intial null value, decode token for username, request user infomation from API and set currentUser state. username is decoded from jwt.
  useEffect(
    function () {
      async function userInfo() {
        let { username } = jwt.decode(token);
        try {
          let user = await Paf.getUserInfo(username);
          setCurrentUser(user);
        } catch (err) {
          console.error(err);
        }
      }
      //Only call this if there is a token present.
      if (token) {
        userInfo();
      }
    },
    [token]
  );

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Navbar logoutFunc={(f) => handleLogout(f)} />
      <div className="main">
        <Routes
          loginFunc={(f) => handleLogin(f)}
          signupFunc={(f) => handleSignup(f)}
        />
      </div>
    </UserContext.Provider>
  );
}

export default App;
