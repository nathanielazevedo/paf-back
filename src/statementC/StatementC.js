/** @format */

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./StatementC.css";
import Statement from "../statement/Statement";
import Form from "../form/Form";
import Paf from "../api.js";
import { Button } from "reactstrap";


//All API calls for statement info live here.
function StatementC() {
  const { id } = useParams();
  const [form, setForm] = useState(false);
  const [statements, setStatements] = useState();

  //TOGGLE FORM
  const openForm = () => {
    setForm(true);
  };
  const closeForm = () => {
    setForm(false);
  };

  // DELETE STATEMENT
  async function deleteStatement(id) {
    await Paf.deleteStatement(id);
    let pos = statements
      .map((s) => {
        return s.id;
      })
      .indexOf(id);

    setStatements((data) => {
      data.splice(pos, 1);
      return [...data];
    });
  }

  // EDIT STATEMENT
  async function editStatement(id, data) {
    await Paf.editStatement(id, data);
    let pos = statements
      .map((s) => {
        return s.id;
      })
      .indexOf(id);

    setStatements((datas) => {
      datas[pos].statement = data.statement;
      return [...datas];
    });
    return { success: true };
  }

  //ADD STATEMENT
  const addStatement = async (formData) => {
    formData.friend_id = parseInt(id);
    let res = await Paf.addFriendStatement(formData);
    setStatements((data) => [...data, res]);
    setForm(false);
    return { success: true };
  };

  //GATHER STATEMENTS FOR SPECIFIC USER
  useEffect(
    function () {
      async function getFriendInfo() {
        let friend = await Paf.getFriendInfo(id);
        setStatements(friend.statements);
      }
      getFriendInfo();
    },
    [id]
  );

  return (
    <>
      <ul className="friend-convo-list">
        <li className="friend-i-say title">When I say...</li>
        {statements
          ? statements.map((s, i) => {
              return (
                <Statement
                  say={s.statement}
                  id={s.id}
                  editFunc={editStatement}
                  deleteFunc={() => deleteStatement(s.id)}
                  fId={id}
                  key={i}
                />
              );
            })
          : null}
        <li className="container-button">
          <Button onClick={openForm}>Add Statement</Button>
        </li>
      </ul>
      {form ? (
        <Form
          title="New Statement"
          inputs={["statement"]}
          func={addStatement}
          after={null}
          close={closeForm}
        />
      ) : null}
    </>
  );
}

export default StatementC;
