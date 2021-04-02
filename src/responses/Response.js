/** @format */

import "./Response.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "../form/Form";
import Paf from "../api.js";
import { useHistory } from "react-router-dom";

function Response() {
  const { id } = useParams();
  const history = useHistory();
  const [form, setForm] = useState(false);
  const [theySays, settheySays] = useState([]);
  const [statement, setStatement] = useState();

  const openForm = () => {
    setForm(true);
  };
  const closeForm = () => {
    setForm(false);
  };

  const addtheySay = async (formData) => {
    formData.statement_id = id;
    let res = await Paf.addStatementResponse(formData);
    settheySays((data) => {
      if (data) {
        return [...data, res];
      } else {
        return [res];
      }
    });
    setForm(false);
    return { success: true };
  };

  function back() {
    history.push(`/friend/${id}`);
  }

  useEffect(function () {
    async function getStatementInfo() {
      let statementy = await Paf.getStatementInfo(id);
      settheySays(statementy.responses);
      delete statementy.responses;
      setStatement(statementy);
    }

    getStatementInfo();
  }, []);

  return (
    <div className="response-container">
      <div className="friend-contained">
        <div className="friend-convos-container">
          <ul className="friend-convo-list">
            <li className="friend-i-say title">
              When I say {statement ? statement : null}
            </li>
            <li className="friend-i-say title">My friend can say...</li>
            {theySays
              ? theySays.map((s, i) => {
                  return <ul className="response" key={s.id}>{s.response} </ul>;
                })
              : null}
            <div>
              <i class="fas fa-arrow-circle-left add-icon" onClick={back}></i>
              <i class="fas fa-plus-circle add-icon" onClick={openForm}></i>
            </div>
          </ul>
          {form ? (
            <div className="floating-form responses-page">
              <Form
                title="New Response"
                inputs={["response"]}
                func={addtheySay}
                after={`/responses/${id}`}
                close={closeForm}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Response;
