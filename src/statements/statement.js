/** @format */

import React from "react";
import { Link } from "react-router-dom";
import './statement.css'

function Statement({ say, id }) {
  return (
    <Link to={`/responses/${id}`} className="friend-statement">
      <li className="friend-i-say">
        <h3>{say}</h3>
        <h5>Click to Program Responses</h5>
      </li>
    </Link>
  );
}

export default Statement;
