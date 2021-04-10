/** @format */

import "./Form.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from "reactstrap";

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

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

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
