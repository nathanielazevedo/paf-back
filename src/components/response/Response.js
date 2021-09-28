/** @format */

import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Form from "../form/Form";
import "./Response.css";


//Renders an individual response.

function Response({ s, deleteFunc, editFunc }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  //Toggles individual response dropdown form.
  const [form, setForm] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  //Opens edit form.
  const openForm = () => {
    setForm(true);
  };
  const closeForm = () => {
    setForm(false);
  };
  return (
    <>
      <ul className="response" key={s.id}>
        {s.response}
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>Actions</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={openForm}>Edit Response</DropdownItem>
            <DropdownItem onClick={() => deleteFunc(s.id)}>
              Delete Response
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </ul>
      {form ? (
        <Form
          title="Edit Statement"
          inputs={["response"]}
          pres={s.response}
          func={editFunc}
          after={null}
          close={closeForm}
          id={s.id}
        />
      ) : null}
    </>
  );
}

export default Response;
