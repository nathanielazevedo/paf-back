/** @format */

import React from "react";
import avatar from "../assets/paf-logo.jpg";
import { Link } from "react-router-dom";
import './Friend.css'

function Friend({ name, description, id, deleteFunc }) {
  return (
    <div className="friend-row">
      <Link
        style={{ width: "100%", textDecoration: "none" }}
        to={`/friend/${id}`}
      >
        <li className="friend">
          <img src={avatar} className="friend-avatar" alt="avatar" />
          <h5>{name}</h5>
          <p className="friend-description">{description}</p>
        </li>
      </Link>
      <i className="fas fa-minus-circle remove-icon" onClick={deleteFunc}></i>
    </div>
  );
}

export default Friend;
