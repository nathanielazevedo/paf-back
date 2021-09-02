/** @format */

import "./ResponseC.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "../form/Form";
import Paf from "../api.js";
import { Button } from "reactstrap";
import Response from "../response/Response";

//All api requests regarding responses are initiated here. (CRUD)

function ResponseC() {
  const { id } = useParams();
  const [form, setForm] = useState(false);
  const [responses, setResponses] = useState([]);
  const [statement, setStatement] = useState();

  const openForm = () => {
    setForm(true);
  };
  const closeForm = () => {
    setForm(false);
  };

  //Get all responses upon render
  useEffect(
    function () {
      async function getStatementInfo() {
        let statementy = await Paf.getStatementInfo(id);
        setResponses(statementy.responses);
        delete statementy.responses;
        setStatement(statementy.statement);
      }
      getStatementInfo();
    },
    [id]
  );

  //ADD RESPONSE
  const addResponse = async (formData) => {
    formData.statement_id = parseInt(id);
    let res = await Paf.addStatementResponse(formData);
    setResponses((data) => {
      if (data) {
        return [...data, res];
      } else {
        return [res];
      }
    });
    setForm(false);
    return { success: true };
  };

  // Edit RESPONSE
  async function editResponse(id, data) {
    await Paf.editResponse(id, data);
    let pos = responses
      .map((s) => {
        return s.id;
      })
      .indexOf(id);

    setResponses((datas) => {
      datas[pos].response = data.response;

      return [...datas];
    });
    return { success: true };
  }

  // Delete a response
  async function deleteResponse(id) {
    await Paf.deleteResponse(id);
    let pos = responses
      .map((s) => {
        return s.id;
      })
      .indexOf(id);

    setResponses((data) => {
      data.splice(pos, 1);

      return [...data];
    });
  }

  return (
    <>
      <ul className="friend-convo-list">
        <li className="friend-i-say title">
          When I say {statement ? statement : null}
        </li>
        <li className="friend-i-say title">My friend can say...</li>
        {responses
          ? responses.map((s, i) => {
              return (
                <Response
                  s={s}
                  deleteFunc={deleteResponse}
                  editFunc={editResponse}
                  key={i}
                />
              );
            })
          : null}
        <li className="container-button">
          <Button onClick={openForm}>Add Response</Button>
        </li>
      </ul>
      {form ? (
        <Form
          title="New Response"
          inputs={["response"]}
          func={addResponse}
          after={`/paf-front-end/responses/${id}`}
          close={closeForm}
        />
      ) : null}
    </>
  );
}

export default ResponseC;
