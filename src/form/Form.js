/** @format */

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from "reactstrap";
import "./Form.css";

//This component is used for every instances a form is need throughout the app. It accepts many different props that will adjust it's behavior.

//title = title of formData
//inputs = the different input fields this form will need to generate 
//func = the function it should execute with submitted data
//after = where should the user be redirected after submission
//close = When clicking X form closes.
//id = some routes require an id, this allows you pass the id to the form.
//pres = presets to the form, values the form should start with.

function MyForm({
  title,
  inputs,
  func,
  after,
  close = null,
  id = null,
  pres = null,
}) {
  const history = useHistory();

  const INITIAL_STATE = {};

  //fills intials state of form depending if "pres" were passed down as props
  if (pres) {
    inputs.map((i, index) => {
      return (INITIAL_STATE[i] = pres[index]);
    });
  } else {
    inputs.map((i) => {
      return (INITIAL_STATE[i] = "");
    });
  }

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [formErrors, setFormErrors] = useState([]);

  //Handles form inputes, updates state from info in evt.target.
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  //Some forms should not close, must pass "close" as props.
  let closer = close ? (
    <i className="fas fa-times close" onClick={close} data-testid="close"></i>
  ) : null;

  
  //Submit form to prop func. Reroute to homepage or show errors.
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let res;
    if (id) {
      res = await func(id, formData);
    } else {
      res = await func(formData);
    }
    if (res.success) {
      setFormData(INITIAL_STATE);
      if (closer) {
        close();
      }
      if (after) {
        history.push(after);
      }
    } else {
      setFormErrors(res.errors);
    }
  };

  return (
    <div className="form-container">
      <div className="form-inner">
        {closer}
        <h3 className="form-title">{title}</h3>
        <form className="form-input-container">
          {inputs.map((m, i) => {
            return (
              <div className="form-input-group" key={i}>
                <label htmlFor={m}>{m}</label>
                <input
                  type="text"
                  name={m}
                  className="form-input"
                  value={formData[m]}
                  onChange={handleChange}
                  placeholder={m}
                  required
                  data-testid={m}
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
          <button
            data-testid="button"
            type="submit"
            className="form-button"
            onClick={handleSubmit}
          >
            {title}
          </button>
        </form>
      </div>
    </div>
  );
}

export default MyForm;
