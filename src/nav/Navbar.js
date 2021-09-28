/** @format */

import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from ".././UserContext";
import "./Navbar.css";

//No api work here.
//Context is consumed here to determine login status.

function NavBar({ logoutFunc, loginFunc }) {
  const { currentUser } = useContext(UserContext);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const closeMobileGuest = () => {
    setClick(false);
    loginFunc({ username : "guest", password : "guest55"})
  }

  //Generate nav for logged in users.
  function loggedInNav() {
    return (
      <>
        <nav className="navbar">
          <div className="navbar-container">
            <NavLink
              to="/paf-front-end/friends"
              className="navbar-logo"
              onClick={closeMobileMenu}
            >
              {"<SSF/>"}
            </NavLink>
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink
                  to="/paf-front-end/friends"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Friends
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/paf-front-end/sign-up"
                  className="nav-links"
                  onClick={logoutFunc}
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }

  //Generate nav for logged out users.
  function loggedOutNav() {
    return (
      <>
        <nav className="navbar">
          <div className="navbar-container">
            <Link
              to="/paf-front-end"
              className="navbar-logo"
              onClick={closeMobileMenu}
            >
              {"<SSF/>"}
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link className="nav-links" onClick={closeMobileGuest}>
                  Try as guest
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/paf-front-end/login"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/paf-front-end/sign-up"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
  //Check if logged in or not from context.
  return currentUser ? loggedInNav() : loggedOutNav();
}

export default NavBar;
