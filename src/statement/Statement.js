/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./statement.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Form from "../form/Form";

//Generates display for each individual statement.

function Statement({ say, id, deleteFunc, editFunc, fId }) {
  const [form, setForm] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  //Toggles edit form
  const openForm = () => {
    setForm(true);
  };
  const closeForm = () => {
    setForm(false);
  };
  return (
    <>
      <li className="friend-i-say">
        <h3>{say}</h3>
        <Dropdown isOpen={dropdownOpen} toggle={toggle} className="drop">
          <DropdownToggle caret>Actions</DropdownToggle>
          <DropdownMenu>
            <Link
              to={`/paf-front-end/responses/${id}`}
              style={{ textDecoration: "none" }}
            >
              <DropdownItem
                onClick={openForm}
                style={{ textDecoration: "none" }}
              >
                Program Responses
              </DropdownItem>
            </Link>
            <DropdownItem onClick={openForm}>Edit Statement</DropdownItem>
            <DropdownItem id="delete" onClick={deleteFunc}>
              Delete Statement
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </li>
      {form ? (
        <div className="floating-form">
          <Form
            title="Edit Statement"
            inputs={["statement"]}
            pres={[say]}
            func={(id, data) => editFunc(id, data)}
            after={null}
            close={closeForm}
            id={id}
          />
        </div>
      ) : null}
    </>
  );
}

export default Statement;
