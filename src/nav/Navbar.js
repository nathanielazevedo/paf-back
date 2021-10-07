import React, {useState, useContext} from "react";
import {Link, NavLink} from "react-router-dom";
import UserContext from ".././UserContext";
import "./Navbar.css";

//Context is consumed here to determine login status.

function NavBar({logoutFunc, loginFunc}) {
  const {currentUser} = useContext(UserContext);

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const closeMobileMenu = () => setClick(false);

  const closeMobileGuest = () => {
    setClick(false);
    loginFunc({username: "guest", password: "guest55"});
  };

  //Generate nav for logged in users.
  function loggedInNav() {
    return (
      <nav className="nav-container">
        <NavLink to="/" exact className="nav-logo" onClick={closeMobileMenu}>
          Spanish{" "}
          <div
            style={{display: "inline"}}
            className={`accent ${currentUser.color}`}
          >
            Partner
          </div>
        </NavLink>
        <div className="nav-hamburger" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <div className={click ? "nav-links" : "nav-links"}>
          <NavLink
            to="/paf-front-end/friends"
            className={`nav-link ${currentUser.color}`}
            onClick={closeMobileMenu}
          >
            Friends
          </NavLink>
          <NavLink
            to="/paf-front-end/sign-up"
            className={`nav-link ${currentUser.color}`}
            onClick={logoutFunc}
          >
            Logout
          </NavLink>
          <NavLink to="/paf-front-end/settings" className={`nav-link ${currentUser.color}`}>
            <i className="fas fa-cog" style={{color: "white"}}></i>
          </NavLink>
        </div>
      </nav>
    );
  }

  //Generate nav for logged out users.
  function loggedOutNav() {
    return (
      <nav className="nav-container">
        <Link
          to="/paf-front-end"
          className="nav-logo"
          onClick={closeMobileMenu}
        >
          Spanish{" "}
          <div style={{color: "#1fa58a", display: "inline"}}>Partner</div>
        </Link>
        <div className="nav-hamburger">
          <i
            className={click ? "fas fa-times" : "fas fa-bars"}
            onClick={handleClick}
          />
        </div>
        <div className={click ? "nav-links active" : "nav-links"}>
          <div className="nav-link" onClick={closeMobileGuest}>
            Try as guest
          </div>
          <Link
            to="/paf-front-end/login"
            className="nav-link"
            onClick={closeMobileMenu}
          >
            Login
          </Link>
          <Link
            to="/paf-front-end/sign-up"
            className="nav-link"
            onClick={closeMobileMenu}
          >
            Sign Up
          </Link>
        </div>
      </nav>
    );
  }
  //Check if logged in or not from context.
  return currentUser ? loggedInNav() : loggedOutNav();
}

export default NavBar;
