/** @format */

import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from ".././UserContext";
import "./Navbar.css";

//No api work here.
//Context is consumed here to determine login status.

function NavBar({ logoutFunc }) {
  const { currentUser } = useContext(UserContext);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  //Generate nav for logged in users.
  function loggedInNav() {
    return (
      <>
        <nav className="navbar">
          <div className="navbar-container">
            <NavLink to="/" className="navbar-logo" onClick={closeMobileMenu}>
              {"<PAF/>"}
            </NavLink>
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink
                  to="/friends"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Friends
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/sign-up"
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
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              {"<PAF/>"}
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/sign-up"
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
