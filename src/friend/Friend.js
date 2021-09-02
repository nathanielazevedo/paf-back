/** @format */

import React, { useState } from "react";
import avatar from "../assets/brain.jpg";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Form from "../form/Form";
import "./Friend.css";

//Renders individual friend. State for edit form and dropdown selections for each friend live here.

function Friend({ name, description, id, deleteFunc, editFunc }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [form, setForm] = useState(false);

  //Dropdown toggle
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  //Edit friend info form toggle.
  const openForm = () => {setForm(true)};
  const closeForm = () => {setForm(false)};

  return (
    <>
      <li className="friend">
        <img src={avatar} className="friend-avatar" alt="avatar" />
        <h5>{name}</h5>
        <p className="friend-description">{description}</p>

        <Dropdown isOpen={dropdownOpen} toggle={toggle} className="drop">
          <DropdownToggle caret>Actions</DropdownToggle>
          <DropdownMenu>
            <Link
              style={{ textDecoration: "none" }}
              to={`/paf-front-end/friend/${id}`}
            >
              <DropdownItem onClick={openForm}>Program Friend</DropdownItem>
            </Link>
            <Link
              to={`/paf-front-end/chat/${id}`}
              style={{ textDecoration: "none" }}
            >
              <DropdownItem>Chat</DropdownItem>
            </Link>
            <DropdownItem onClick={openForm}>Edit Friend</DropdownItem>
            <DropdownItem id="delete" onClick={deleteFunc}>
              Delete Friend
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </li>
      {form ? (
        <Form
          title="Edit Friend"
          inputs={["name", "description"]}
          pres={[name, description]}
          func={(id, data) => editFunc(id, data)}
          after={null}
          close={closeForm}
          id={id}
        />
      ) : null}
    </>
  );
}

export default Friend;
