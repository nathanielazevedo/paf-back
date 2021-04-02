/** @format */

import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import UserContext from ".././UserContext";

function NavBar({ logoutFunc }) {
  const [click, setClick] = useState(false);
  
  const handleClick = () => setClick(!click);
  const { currentUser } = useContext(UserContext);

  const closeMobileMenu = () => setClick(false);


  function loggedInNav() {
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
                  to="/friends"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Friends
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/sign-up" className="nav-links" onClick={logoutFunc}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }

  function loggedOutNav() {
    return (
      <>
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              PAF
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

  return currentUser ? loggedInNav() : loggedOutNav();
}

export default NavBar;
