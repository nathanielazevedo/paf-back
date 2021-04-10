/** @format */

import React, { useState } from "react";
import avatar from "../assets/brain.jpg";
import { Link } from "react-router-dom";
import "./Friend.css";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, } from "reactstrap";
import Form from "../form/Form";

function Friend({ name, description, id, deleteFunc, editFunc }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [form, setForm] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const openForm = () => {
    setForm(true);
  };
  const closeForm = () => {
    setForm(false);
  };

  return (
    <>
        <li className="friend">
          <img src={avatar} className="friend-avatar" alt="avatar" />
          <h5>{name}</h5>
          <p className="friend-description">{description}</p>

          <Dropdown isOpen={dropdownOpen} toggle={toggle} className="drop">
            <DropdownToggle caret>Actions</DropdownToggle>
            <DropdownMenu>
              <Link style={{ textDecoration: "none" }} to={`/friend/${id}`}>
                <DropdownItem onClick={openForm}>Program Friend</DropdownItem>
              </Link>
              <Link to={`/chat/${id}`} style={{ textDecoration: "none" }}>
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

