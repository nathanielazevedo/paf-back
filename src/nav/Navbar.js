/** @format */

import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import UserContext from ".././UserContext";

//NAVBAR no api work here

function NavBar({ logoutFunc }) {
  const { currentUser } = useContext(UserContext);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  
  //GENERATE NAV FOR LOGGED IN USERS
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

  //GENERATE NAV FOR LOGGED OUT USERS
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

  return currentUser ? loggedInNav() : loggedOutNav();
}

export default NavBar;
