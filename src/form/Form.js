/** @format */

import "./Form.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from "reactstrap";
import { Button } from "../button/Button";


function MyForm({ title, inputs, func, after, close }) {
  const history = useHistory();

  const INITIAL_STATE = {};

  inputs.map((i) => {
    return INITIAL_STATE[i] = "";
  });

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [formErrors, setFormErrors] = useState([]);
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  //Submit form to prop func. Reroute to homepage or show errors.
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let res = await func(formData);
    if (res.success) {
      setFormData(INITIAL_STATE);
      history.push(after);
    } else {
      setFormErrors(res.errors);
    }
  };

  return (
    <div className="form-container">
      <h3 className="form-title">{title}</h3>
      <i class="fas fa-times close" onClick={close}></i>
      <form className="form-input-container">
        {inputs.map((m, i) => {
          return (
            <div className="form-input-group" key={i}>
              <label htmlFor={m}>{m}</label>
              <input
                type="text"
                name={m}
                className="form-input"
                value={formData.m}
                onChange={handleChange}
                placeholder={m}
                required
              ></input>
            </div>
          );
        })}
        {formErrors.length
          ? formErrors.map((e, i) => {
              return (
                <Alert color="danger" key={i}>
                  {" "}
                  {e}
                </Alert>
              );
            })
          : null}
        <button type="submit" className="form-button" onClick={handleSubmit}>
          {title}
        </button>
      </form>
    </div>
  );
}

export default MyForm;
